import React, { useState } from 'react'
import ProductSalesPieChart from './pie.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import ProductComponent from './entry.jsx';

export default function dash(props) {

  const [showForm, setShowForm] = useState(false)

  // alert(props.prop+"from dash");
  if (props.prop!="vada") {
    throw new Error('login and try again');
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value
    const discount = e.target.discount.value
    const quantity = e.target.quantity.value

    try {
      const res = await axios.put('/api/offer', {
        title,
        discount,
        quantity
      });

   alert(res.data);

    
    } catch (err) {
      console.log(err);
    }
  }
  const [data, setData] = useState([]);

  const stockCheck = async () => {
    try {
      const res = await axios.get('/api/food');
      // console.log(res.data);
  
      // Filter items with quantity less than 10
      const filteredData = res.data.filter(item => item.quantity < 10);
      setData(filteredData);
      
      alert("Items with quantity less than 10:   " + filteredData.map(item => item.product_name).join(", "));
      
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
   <br /> <div><button className='btn' onClick={() => stockCheck()}>check stock</button></div>
     <div style={{display:"flex",justifyContent:"space-evenly",justifyItems:"center"}}>
   
      <div style={{marginTop:"13%"}}><form onSubmit={handleSubmit} className='form'>
      <h3 style={{textAlign:"center",textTransform:"uppercase"}}>Add Offer</h3><br />
        <input type="text"placeholder='enter discount title' name="title" className='inputBox' /><br />
        <input type="text"placeholder='enter discount percentage' name="discount" className='inputBox'  /><br />
        <input type="text"placeholder='enter quantity of products for discount ' name="quantity" className='inputBox' /><br />
        <input type="submit" className='btn ' value="Add discount" />
      </form></div>
     
      
      
      
     <div style={{display:"flex",justifyContent:"space-evenly"}}><ProductSalesPieChart  /></div></div><br /><br /><br /><br /><br /><br /> 
      
     
    </>
  )
}





