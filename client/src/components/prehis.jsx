import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function Prehis(props) {
  const [orders, setOrders] = useState([]);

  if (!props.prop) {
    throw new Error('Login and try again');
  }

  useEffect(() => {
    axios.get('/api/getpreorderhis')
      .then(res => {
        setOrders(res.data);
        console.log(res.data, 'data');
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  const handleDelete = async (id) => {
    const ans = window.confirm('Are you sure you want to delete this item?');
    if (ans) {
      try {
        await axios.delete(`/api/deletepreorderhis/${id}`);
        setOrders(orders.filter(order => order.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Order History</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Pickup Date/Time</th>
            <th>Order Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{moment(order.pickupDatetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>{moment(order.orderDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td><button onClick={() => handleDelete(order.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prehis;

