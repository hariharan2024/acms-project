import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ALogin(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  // const sendDataToParent = () => {
  //   const message = '1';
  //   props.sendDataToParent(message);
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/alogin", inputs);
      console.log(res);
      props.sendDataToParent("poda");
      window.location.href="/dash";
    } catch (err) {
      setError(err.response.data);
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
          <input
            required
            name="password"
            type="password"
            value={inputs.password}
            placeholder="Enter your password here"
            onChange={handleChange}
            className="inputBox"
            />
        </div>

        <br /><br />
        <button className="btn btn-primary" type="submit">LOGIN</button>

        <br /><br /><br />
       
      </form>
    </div>
  )
}


export default ALogin;