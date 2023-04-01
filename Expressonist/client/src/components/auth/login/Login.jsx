

// import React, { useRef } from 'react';
// import { Form, FormGroup, Input, Button } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import FullButton from '../../button/FullButton';

// import './Login.css';

// function Login({ updateToken }) {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const navigate = useNavigate(); // Get the navigate function from react-router-dom

//   const handleSubmit = async e => {
//     e.preventDefault();

//     let bodyObj = JSON.stringify({
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     });

//     const url = 'http://localhost:4004/user/login';

//     try {
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json',
//         }),
//         body: bodyObj,
//       });

//       const data = await res.json();
//       emailRef.current.value = '';
//       passwordRef.current.value = '';

//       if (data.user) {
//         updateToken(data.token);
//         navigate('/dashboard'); // Navigate to the dashboard route on successful login
//       } else {
//         alert('Try a different email or password');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className="login-container">
//         <h2>Login</h2>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Input
//               innerRef={emailRef}
//               type="email"
//               placeholder="email"
//               autoComplete="off"
//             />
//           </FormGroup>
//           <FormGroup>
//             <Input
//               innerRef={passwordRef}
//               type="password"
//               placeholder="password"
//               autoComplete="off"
//             />
//           </FormGroup>
//           <FullButton>
//             <Button type="submit" color="dark">
//               Login
//             </Button>
//           </FullButton>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default Login;



// 2



// import React, { useRef } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Box,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import FullButton from '../../button/FullButton';

// const LoginContainer = styled(Paper)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: 20,
//   marginTop: 20,
//   '& h2': {
//     marginBottom: 20,
//   },
//   '& form': {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     '& .MuiFormControl-root': {
//       width: '100%',
//       marginBottom: 20,
//     },
//     '& .MuiTextField-root': {
//       width: '30%',
//     },
//   },
// });

// function Login({ updateToken }) {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const navigate = useNavigate(); // Get the navigate function from react-router-dom

//   const handleSubmit = async e => {
//     e.preventDefault();

//     let bodyObj = JSON.stringify({
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     });

//     const url = 'http://localhost:4004/user/login';

//     try {
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json',
//         }),
//         body: bodyObj,
//       });

//       const data = await res.json();
//       emailRef.current.value = '';
//       passwordRef.current.value = '';

//       if (data.user) {
//         updateToken(data.token);
//         navigate('/dashboard'); // Navigate to the dashboard route on successful login
//       } else {
//         alert('Try a different email or password');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <LoginContainer elevation={3}>
//         <Typography variant="h2" component="h2" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             inputRef={emailRef}
//             type="email"
//             label="Email"
//             variant="outlined"
//             autoComplete="off"
//             required
//             sx={{ width: '80%' }}
//           />
//           <TextField
//             inputRef={passwordRef}
//             type="password"
//             label="Password"
//             variant="outlined"
//             autoComplete="off"
//             required
//             sx={{ width: '80%' }}
//           />
//           <Box width="30%" marginTop={2}>
//             <FullButton>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Login
//               </Button>
//             </FullButton>
//           </Box>
//         </form>
//       </LoginContainer>
//     </>
//   );
// }

// export default Login;



// 3









import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FullButton from '../../button/FullButton';

const LoginContainer = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  marginTop: 20,
  '& h2': {
    marginBottom: 20,
  },
  '& form': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: 20,
    },
    '& .MuiTextField-root': {
      width: '100%',
      maxWidth: '50%',
    },
  },
});

function Login({ updateToken }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSubmit = async e => {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    const url = `${baseURL}/user/login`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: bodyObj,
      });

      const data = await res.json();
      emailRef.current.value = '';
      passwordRef.current.value = '';

      if (data.user) {
        updateToken(data.token);
        navigate('/dashboard'); // Navigate to the dashboard route on successful login
      } else {
        alert('Try a different email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LoginContainer elevation={3}>
        <Typography variant="h2" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            inputRef={emailRef}
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            required
            sx={{ width: '100%', maxWidth: '50%' }}
          />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            required
            sx={{ width: '100%', maxWidth: '50%' }}
          />
          <Box width="50%" marginTop={2}>
            <FullButton>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ width: '100%', maxWidth: '50%' }}
              >
                Login
              </Button>
            </FullButton>
          </Box>
        </form>
      </LoginContainer>
    </>
  );
}

export default Login;
