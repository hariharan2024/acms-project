import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './search'; // assuming Search component is in the same directory

const Cust = (props) => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    if (!props.prop) {
        throw new Error('login and try again');
        
      }

    useEffect(() => {
        axios.get('/api/cust')
            .then(res => {
                setCustomers(res.data);
                setFilteredCustomers(res.data); // Initialize filteredCustomers with all customers
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleDelete = (id) => {
        axios.delete(`/api/deletecust/${id}`)
            .then(res => {
                const newCustomers = customers.filter(cust => cust.id !== id);
                setCustomers(newCustomers);
                setFilteredCustomers(newCustomers); // Update filteredCustomers after deletion
                alert(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSearch = (query) => {
        const filtered = customers.filter(customer =>
            customer.name.toLowerCase().includes(query.toLowerCase()) ||
            customer.email.toLowerCase().includes(query.toLowerCase()) ||
            customer.phone.includes(query)
        );
        setFilteredCustomers(filtered);
    }

    return (
        <div className="main-content ">
            <br /><br /><br /><br /><br /><br />
            <h3 className="content">Customer Details</h3>
            <Search handleSearch={handleSearch} /><br /><br />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <Link to={`/updatecust/${customer.id}`} className="btn btn-warning mr-2">Edit</Link>
                                <button onClick={() => { if (window.confirm('Are you sure you want to delete this customer?')) handleDelete(customer.id) }} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br /><br />
        </div>
    );
};

export default Cust;
