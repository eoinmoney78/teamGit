import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Logout({setToken}) {
    const navigate = useNavigate;

    const signout = () => {
        localStorage.removeItem('token');
        setToken('');
        console.log('signout')
        navigate('/');
    }

    return (
        <Button
                onClick={signout}
                color="danger"
                outline
            >Logout</Button>
    )
}

export default Logout