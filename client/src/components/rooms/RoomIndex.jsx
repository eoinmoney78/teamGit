import React, { useState, useRef } from 'react'
import { Button, FormGroup, Input, Form, Label } from 'reactstrap'
import {useNavigate} from 'react-router-dom';
import { baseURL } from '../../environment'

function RoomIndex(props) {

    const rooms = ["Debug"];

    const nameRef = useRef(); 
    const descriptionRef = useRef();
    const addedUsersRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const addedUsers = addedUsersRef.current.value;

        let bodyObj = JSON.stringify({
            name, description, addedUsers
        })

        const url = `${baseURL}/room/openroom`;
        const headers = new Headers(); 
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', props.token);

        const requestOptions = {
            headers,
            body: bodyObj,
            method: 'POST'
        }

        try { 
            const res = await fetch(url, requestOptions);
            const data = await res.json(); 

            //Creating if else statement to determine route path
            if(data.user.name === 'Debug') {
                navigate('/debugchat') 
            } else {
                alert("Woops something went wrong!?")
                }
            }

        catch (err) {
            console.error(err);
        }
        }
        
    return (
    <>
    <div className="rooms">

    <h1>Available Rooms</h1>

    <Form onSubmit={handleSubmit}>
        <FormGroup>
        <Label><h4>Choose a chat room</h4></Label>
                    <Input 
                        innerRef={nameRef}
                        type='select'
                        autoComplete='off'>
                        {
                            rooms.map((r, i) => (
                                <option key={i} value={r}>{r}</option>
                            ))
                        }
                    </Input>
        </FormGroup>    
        <FormGroup>
            <Input
                innerRef={addedUsersRef}  
                placeholder='Pick a Display Name'
                autoComplete="off"
                value = {props.token}/>
        </FormGroup>    
            <Button type="submit" color="dark">Join</Button>
    </Form>
    </div>
</>
)
}




export default RoomIndex
