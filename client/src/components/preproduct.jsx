import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Preproduct(props) {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    axios.get('/api/getpreorder')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/putpreorder', inputValue);
    //   alert(res.data);
      setInputValue({
        name: '',
        price: '',
        quantity: ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteItem = async id => {
    const ans = window.confirm('Are you sure you want to delete this item?');
    if (ans) {
      try {
        await axios.delete(`/api/deletepreorder/${id}`);
        setData(data.filter(item => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    
        
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1 className='label'> Add Preproduct </h1>
      <br />
      <form className='form' onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name</label> */}
        <input className='inputBox' type="text" name="name" id="name" placeholder='Enter product name' value={inputValue.name} onChange={handleChange} />
        <br />
        {/* <label htmlFor="price">Price</label> */}
        <input className='inputBox' type="number" name="price" id="price" placeholder='Enter product price' value={inputValue.price} onChange={handleChange} />
        <br />
        {/* <label htmlFor="quantity">Quantity</label> */}
        <input className='inputBox' type="number" name="quantity" placeholder='Enter product quantity' id="quantity" value={inputValue.quantity} onChange={handleChange} />
        <br />
        <button className='inputButton'>Add Product</button>
      </form>
      <br /><br />
      <table >
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Product Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Quantity</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{product.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{product.price}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{product.quantity}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => deleteItem(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Preproduct;

