import React, { useState, useRef } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import FullButton from '../../button/FullButton';
import {useNavigate} from 'react-router-dom';

function Signup({updateToken}) {

    //UseRef turns our variable into an object called current. We will pass this information so the form can store it. UseRef does not cause Re-renders of the page. 
    const firstNameRef = useRef(); 
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    //retrieving our useRef Object and setting it to a variable. This variable MUST be the same as what we have from the backend. 
    async function handleSubmit(e) {
        e.preventDefault();
        const first = firstNameRef.current.value;
        const last = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
     
        //Turning our object into a JSON string so we can send it to the backend. Think of this object as the same as the object that we use in POSTMAN.
        let bodyObj = JSON.stringify({
            first, last, email, password
        })

        //Storing our Express API into a variable. Must be same endpoing. (similar to postman.)
        const url = `http://localhost:5003/user/signup`;
        const headers = new Headers(); //Our headers tell what info is being sent through. 
        //Setting our headers to accept the JSON information wiithin the browser. 
        headers.append("Content-Type", "application/json");
        
        //Think of this as the req.body that our backend requested. This is all the info that we packaged up and we will be sending. 
        const requestOptions = {
            headers,
            body: bodyObj,
            method: 'POST'
        }
                     
        try {   //Requesting from our express API
            const res = await fetch(url, requestOptions);
            const data = await res.json(); //Giving the backend our data. 

            if(data.user) {
                updateToken(data.token); //Giving the user a token so they can have access.
                navigate('/availablerooms') //Sending the user to the new chat page.
            } else {
                alert("User not added?")
            }

        } catch (err) {
            console.error(err);
        }

    }

    return (
        <>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        innerRef={firstNameRef}
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        innerRef={lastNameRef}
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        innerRef={emailRef}
                        type="email"
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        innerRef={passwordRef}
                        type="password"
                        autoComplete="off"
                    />
                </FormGroup>
                <FullButton>
                    <Button type="submit" color="dark">Signup</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Signup