import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateSearch from './datesearch';
import moment from 'moment';

function Order(props) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortKey, setSortKey] = useState('status'); // Default sort key
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

  if (!props.prop) {
    throw new Error('login and try again');
  }

  useEffect(() => {
    axios.get('/api/getord')
      .then(res => {
        setOrders(res.data);
        setFilteredOrders(res.data); // Initialize filteredOrders with all orders
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/deleteord/${id}`)
      .then(res => {
        const newOrders = orders.filter(order => order.order_id !== id);
        setOrders(newOrders);
        setFilteredOrders(newOrders); // Update filteredOrders after deletion
        alert(res.data);
      })
      .catch(err => console.error('Error deleting order:', err));
  };

  const handleDateSearch = (startDate, endDate) => {
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    setFilteredOrders(filtered);
  };

  const renderProductInfo = (pname, key) => {
    try {
      if (!pname) return <div>No items</div>;
      const products = JSON.parse(pname);
      return products.map((item, index) => <div key={index}>{item[key]}</div>);
    } catch (error) {
      console.error('Error parsing product info:', error);
      return <div>Error parsing product info</div>;
    }
  };

  const handleSort = (key) => {
    let sortedOrders = [...filteredOrders];
    
    if (key === sortKey) {
      sortedOrders.reverse();
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      sortedOrders.sort((a, b) => {
        if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setSortOrder('asc');
      setSortKey(key);
    }
    setFilteredOrders(sortedOrders);
  };

  const handledate = () => {
    let sortedOrders = [...filteredOrders];
    // Sort the orders based on the order_date
    sortedOrders.sort((a, b) => {
      const dateA = moment(a.order_date);
      const dateB = moment(b.order_date);
      return dateA - dateB;
    });
    if (sortOrder === 'desc') {
      sortedOrders.reverse();
    }
    setFilteredOrders(sortedOrders);
    setSortKey('order_date'); // Update sortKey state
  };
  

  const handlePending = (d) => {
    axios
      .put(`/api/pending/${d}`)
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Order History</h1>
      <br /><br />
      <DateSearch handleDateSearch={handleDateSearch} />
      <br /><br />
      <table>
        <thead >
          <tr >
            <th onClick={() => handleSort('order_id')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Sr. No.</th>
            <th onClick={handledate} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Order Date</th>
            <th onClick={() => handleSort('pname')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Product Name</th>
            <th onClick={() => handleSort('rate')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Rate</th>
            <th onClick={() => handleSort('email')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Email</th>
            <th onClick={() => handleSort('phone')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Phone</th>
            <th>token</th>  
            <th onClick={() => handleSort('status')} style={{ border: '1px solid black', cursor: 'pointer', textAlign: 'center' }}>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.order_id}>
              <td>{index + 1}</td>
              <td>{moment(order.order_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>{renderProductInfo(order.pname, 'product_name')}</td>
              <td>{renderProductInfo(order.pname, 'rate')}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.token}</td>
              <td>{order.status === 1 ? "Supplied" : <button className="btn-warning btn-sm" style={{ height: '25px' }} onClick={() => handlePending(order.order_id)}>Pending</button>}</td>
              <td>
                <button className="btn-danger btn-sm" style={{ height: '25px' }} onClick={() => { if (window.confirm('Are you sure to delete this record?')) handleDelete(order.order_id) }}><i className="fa fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
