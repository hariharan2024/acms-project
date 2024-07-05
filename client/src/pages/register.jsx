import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [err, setErr] = useState(null);


  const handleSubmit =async e => {
    e.preventDefault();
    const { username, email, password, confirmPassword, phone } = inputs;

    if (password.length < 6) {
      alert('Password should be atleast 8 characters long');
    } else if (password !== confirmPassword) {
      alert('Passwords does not match');
    } 
  else if (phone.length != 10) {
    +      alert('Phone number should be 10 digits long');
    } else {
        try{
          const res = await axios.post('/api/register', {
            username,
            email,
            password,
            phone
          });
          console.log(res);
          alert('Registration successful!');
          window.location.href = '/login';
        }catch(err){
          setErr(err.response.data);
          alert(err.response.data);
        }
      
      

        // .then(response => {
        //   if (err.response.data) {
        //     alert(err.response.data);
        //   } else {
        //     alert('Registration successful!');
        //     window.location.href = '/login';
        //   }
        // })
        // .catch(err => console.log(err));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>REGISTER</h1>
        <br />
        <div className="inputContainer">
          <input
            required
            value={inputs.username}
            placeholder="Enter your username here"
            onChange={(event) => setInputs({ ...inputs, username: event.target.value })}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className="inputContainer">
          <input
            required
            value={inputs.email}
            placeholder="Enter your email here"
            onChange={(event) => setInputs({ ...inputs, email: event.target.value })}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            required
            value={inputs.phone}
            placeholder="Enter your phone number here"
            onChange={(event) => setInputs({ ...inputs, phone: event.target.value })}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            required
            minLength="6"
            value={inputs.password}
            placeholder="Enter your password here"
            onChange={(event) => setInputs({ ...inputs, password: event.target.value })}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            required
            value={inputs.confirmPassword}
            placeholder="confirm your password here"
            onChange={(event) => setInputs({ ...inputs, confirmPassword: event.target.value })}
            className={'inputBox'}
          />
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="submit" value={'REGISTER'} />
          <br />
          <p>already have an account? login</p>
          <p><Link to="/login">here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;

