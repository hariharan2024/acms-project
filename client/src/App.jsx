import "./css/style.css";
import "./css/table.css";
import React from 'react'
import { useState, useEffect } from 'react'
import { createRoot } from "react-dom/client";





import {
  createBrowserRouter,
  RouterProvider,
  Route,
  
  Link,
  useParams
} from "react-router-dom";
import Nav from './components/nav.jsx'
import Foot from './components/foot.jsx'
import Dash from './components/dash.jsx'
import Food from './components/food.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Addfood from './components/addfood.jsx'
import Updatefood from './components/updatefood.jsx';

// import Contact from './pages/contact.jsx'
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Menu from './pages/Menu.jsx';
import Products from './pages/Products.jsx';
import Review from './pages/Review.jsx';
import Footer from './pages/Footer.jsx';
import Cust from './components/cust.jsx';
import UpdateCust from './components/updatecust.jsx';
import Order from './components/order.jsx';
import Addreview from './components/addreview.jsx';
import Reviewpage from './components/reviewpage.jsx'
import OrderHistoryTable from './pages/corder.jsx';

import axios from 'axios'
import ALogin from './components/alogin.jsx';
import ProductComponent from './components/entry.jsx';
import CanteenEmployeeManager from "./components/staff.jsx";
import PreOrder from "./pages/preorder.jsx";
import Preproduct from "./components/preproduct.jsx";
import Prehis from "./components/prehis.jsx";


// import Contact from './components/Contact.jsx'


function App() {

  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [message, setMessage] = useState("vada");



  // Function to receive data from child
  const receiveDataFromChild = (data) => {
    setMessage(data);
    
  }
 
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    // console.log(cartItems);
  };

  const removeFromCart = (indexToRemove) => {
    console.log(indexToRemove)
    const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
    setCartItems(updatedCart); 
   
  };
  


const calculateTotal = (discountedCartItems) => {
  // console.log("asdfghjlasdfghjk",discountedCartItems);
  return discountedCartItems.reduce((total, item) => total + parseFloat(item.rate), 0).toFixed(2);
};

const [timestamps, setTimestamps] = useState([]);

useEffect(() => {
  const timer = setInterval(() => {
    const newTimestamp = new Date().toLocaleString();
    setTimestamps(prevTimestamps => [...prevTimestamps, newTimestamp]);
  }, 1000); // Update every second

  return () => clearInterval(timer); // Cleanup on unmount
}, []);

const handleCheckNow = (did, cuser) => {
  let email = "";
  let phone = "";
  let status="";

  if (cuser) {
    email = cuser.email ? cuser.email : "";
    phone = cuser.phone ? cuser.phone : "";
  }
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  const t = timestamps[1]; // Assuming timestamps is defined elsewhere

  axios.post(`/api/checkout`, { email, phone, did, t,status ,token})
    .then(res => {
      // console.log(res.data);
      alert(res.data);
      
       window.location.reload();

    })
    .catch(err => console.error(err));
};



  const router = createBrowserRouter([
    {
      path: "/login",
      element:<>
      <Navbar />
      <Login />
      <Footer /></> 
    },
    {
      path: "/staff",
      element:  <>
      <div className="acontainer">
     <div className="nav">
       <Nav />
     </div>
     <br /><br /><br /><br />
     <div className="dash">
       <CanteenEmployeeManager prop={message} />
     </div>
     <div className="foot">
       <Foot />
     </div>
   </div>
     </>
    },
    {
      path: "/alogin",
      element: <ALogin sendDataToParent={receiveDataFromChild}/>
    },
    {
      path: "/addreview/:id",
      element:<>
      <Navbar />
      <Addreview />
      <Footer /></> 
    },
   {
    path: "/preorder",
    element:<>
    <Navbar />
    <PreOrder />
    <Footer /></>
   },
  
    {
      path: "/register",
      element: <>
      <Navbar />
      <Register />
      <Footer /></> 
    },
    {
      path: "/dash",
      element: (
        <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Dash prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
          
        
      )
    },
    {
      path: "/food",
      element: (
        <>
         <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Food prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/preproduct",
      element: (
        <>
         <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Preproduct prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },

    {
      path: "/addfood",
      element: (
        <>
            <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Addfood prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/updatefood/:id",
      element: (
        <>
            <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Updatefood prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/prehis",
      element: (
        <>
            <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Prehis prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/cust",
      element: (
        <>
          <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Cust prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/updatecust/:id",
      element: (
        <>
             <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <UpdateCust prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/order",
      element: (
        <>
         <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash"><ProductComponent/>

<div style={{backgroundColor:"aliceblue",textAlign:"center",alignItems:"center"}} >< Order  prop={message}/> </div> <br /><br /><br /><br /></div> 
        <div className="foot">
          <Foot />
        </div>
      </div>
         
        </>
      )
    },
    {
      path: "/reviewpage",
      element: (
        <>
          <div className="acontainer">
        <div className="nav">
          <Nav />
        </div>
        <br /><br /><br /><br />
        <div className="dash">
          <Reviewpage prop={message} />
        </div>
        <div className="foot">
          <Foot />
        </div>
      </div>
        </>
      )
    },
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <br/>
          <Home />
          <Footer />
        </div>
      )
    },
    {
      path: "/products",
      element: (
        <div>
          <Navbar cartItems={cartItems} removeFromCart={removeFromCart} calculateTotal={calculateTotal} handleCheckNow={handleCheckNow}/>
          <br/>
          <br/>
          <Products addToCart={addToCart} cartItems={cartItems}/>
          <Footer />
        </div>
      )
    },
    {
      path: "/review",
      element: (
        <div>
          <Navbar />
          <br/>
          <br/>
          <Review />
          <Footer />
        </div>
      )
    },
    {
      path: "/menu",
      element: (
        <div>
          <Navbar cartItems={cartItems} removeFromCart={removeFromCart} calculateTotal={calculateTotal} handleCheckNow={handleCheckNow}/>
          <br/>
          <br/>
          <Menu addToCart={addToCart} cartItems={cartItems}/>
          <Footer />
        </div>
      )
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <br/>
          <br/>
          <About />
          <Footer />
        </div>
      )
    },
    {
      path: "/corders",
      element: (
        <div>
          <Navbar />
          <br/>
          <br/>
          <OrderHistoryTable />
          <Footer />
        </div>
      )
    }
  ]);
  
  return (
    
    <RouterProvider router={router} />
   
  );
}

export default App


