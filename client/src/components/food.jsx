import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './search'; // assuming Search component is in the same directory

function Food(props) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (!props.prop) {
      // Handle missing prop gracefully
      console.error('Prop is missing');
      // Redirect to login page or show a message
      return;
    }

    axios.get('/api/food')
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.error(err));
  }, [props.prop]);

  const handleDelete = (id) => {
    axios.delete(`/api/deletefood/${id}`)
      .then((res) => {
        const newData = data.filter(item => item.product_id !== id);
        setData(newData);
        setFilteredData(newData);
        alert(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (query) => {
    const filtered = data.filter(item =>
      item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let sortedData = [...filteredData];
    if (key === sortKey) {
      sortedData.reverse();
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setSortOrder('asc');
      setSortKey(key);
    }
    setFilteredData(sortedData);
  };

  return (
    <div className="content">
      <div className='heading'><Search handleSearch={handleSearch} />
      <span>
        <Link className='btn btn-primary' style={{ float: 'left', marginRight: '10px', padding: '0 10px 0 10px', border: '1px solid black', borderRadius: '5px' }} to="/addfood">Add Product</Link>
      </span></div>
      
      <br /><br />
      <table className="table table-bordered table-striped table-hover table-lg" style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }} onClick={() => handleSort('product_id')}>#</th>
            <th style={{ border: '1px solid black' }} onClick={() => handleSort('product_name')}>Food Name</th>
            <th style={{ border: '1px solid black' }} onClick={() => handleSort('rate')}>Rate</th>
            <th style={{ border: '1px solid black' }} onClick={() => handleSort('category')}>Category</th>
            <th style={{ border: '1px solid black' }} onClick={() => handleSort('quantity')}>Quantity</th>
            <th style={{ border: '1px solid black' }}>Status</th>
            <th style={{ border: '1px solid black' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item =>
            <tr key={item.product_id}>
              <td style={{ border: '1px solid black' }}>{item.product_id}</td>
              <td style={{ border: '1px solid black' }}>{item.product_name}</td>
              <td style={{ border: '1px solid black' }}>{item.rate}</td>
              <td style={{ border: '1px solid black' }}>{item.category}</td>
              <td style={{ border: '1px solid black' }}>{item.quantity}</td>
              <td style={{ border: '1px solid black' }}>{item.quantity > 0 ? <label className='label label-success'>Available</label> : <label className='label label-danger'>Out of stock</label>}</td>
              <td>
                <Link to={`/updatefood/${item.product_id}`}><button className="btn btn-primary btn-sm" ><i className="fa fa-pencil"></i></button></Link>
                {item.quantity > 0 && <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Are you sure to delete this record?')) handleDelete(item.product_id) }}><i className="fa fa-trash"></i></button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Food;
