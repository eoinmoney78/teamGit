import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'

function UserIndex(props) {

    const [ users, setUsers ] = useState([]);

    const fetchUsers = async () => {
        const url = `http://localhost:5003/user`;

        const requestOptions = {
            headers: new Headers({
                "Authorization": props.token
            }),
            // browser defaults to GET method
            method: "GET"
        }

        try {
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            // console.log(data.users);
            setUsers(data.users);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(props.token) {
            fetchUsers();
        }
    }, [props.token])

    return (
        <>
            <Container >
                        <Room
                            fetchUsers={fetchUsers}
                            token={props.token} 
                            users={users} />
            </Container>
        </>

    )
}

export default UserIndex