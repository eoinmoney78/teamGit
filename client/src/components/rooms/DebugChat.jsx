import React, { useState, useRef } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'


function DebugChat(props) {


    let today;
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getData();
    const bodyRef = useRef();

    let currentRoom = "Debug Chat";

    const handleSubmit = async (e) => {
    e.preventDefault();
    const body = body.current.value;
    const room = currentRoom;
    const when = date;
    console.log(when);
    const user = "Test";

    let bodyObj = JSON.stringify({
      body, room, when, user
    })

    const url = `http://localhost:5003/newmessage`
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    //* Setting our headers to accept the JSON object within the browser

    const requestOptions = {
        headers,
        body: bodyObj,
        method: 'POST'
    }
  }
  

  return (
    <div className="debugcontainer">
    <div className = "debugchat">
        <h2>Debug Chat</h2>
        <img src="img" alt="" />
        <div className="chatbox">


    <div className="input">
    <Button color="success" 
                    id="reactbutton">
                    SEND 
                </Button>
            <Form>
              <FormGroup> 
                <Input
                    placeholder='Type your message'
                    type="textarea" 
                    name="text"
                    id="debuginput"
                    />
              </FormGroup>
        </Form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DebugChat