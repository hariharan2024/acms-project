import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./login.jsx";
import { AuthContext } from "../context/authcontext.jsx";
import axios from "axios";


const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [offer, setOffer] = useState({ title: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getoffer");
        setOffer(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <> <br/>
    <br/>
      <section  className="home" id="home">
        <div className="content">
          <h3>
            fresh <span>food in the </span>morning
          </h3>
          {currentUser ? (
            <p>Welcome, {currentUser.username}!</p>
          ) : (
            <p>
              <Link to="/login" className="inputButton">Log in</Link> to get amazing offers and
              discounts
            </p>
          )}
        </div>
        {offer && (<div style={{float:"right", width:"70%",textAlign:"center",color:"green"}} className="content" id="whats-new">
          <h3 style={{color:"lightgreen"}} >"What's New"</h3><br /><br /><br />
          <div className="content">
            <h2 style={{textAlign:"center",textDecorationStyle:"wavy",}}>{offer.title}</h2>
          </div></div>)}
        </section>
      
       

    </>
  );
};

export default Home;

