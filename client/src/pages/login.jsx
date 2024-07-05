import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authcontext.jsx';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
     
      // window.location.href="/";
    } catch (err) {
      setError(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>LOGIN</h1><br />

        <div className="inputContainer">
          <input
            required
            name="email"
            value={inputs.email}
            placeholder="Enter your email here"
            onChange={handleChange}
            className="inputBox"
          />
        </div>         

        <br />
        <div className={'inputContainer'}>
  <div className='relative'>
    <input
      required
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={inputs.password}
      placeholder="Enter your password here"
      onChange={handleChange}
      className="inputBox"
      // style={{ width: '100%' }}
    />
    <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
      <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
    </span>
  </div>
</div>

        <br />
        <div className={'inputContainer'}>
          <input className="inputButton" type="submit" value={'Log in'} />
          <br/><br />
          <p>don't have an account? sign up</p><p><Link to="/register" className="btn fas fa-arrow-right"></Link></p>
        </div>
        {err && <div style={{color: 'red'}}>{err}</div>}
      </form>
    </div>
  );
};

export default Login;

