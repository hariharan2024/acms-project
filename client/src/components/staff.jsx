import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Piestaff from './piestaff';

const StaffManager = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    isPresent: false
  });
  const [joinDateQuery, setJoinDateQuery] = useState('');

  useEffect(() => {
    axios.get('/api/staff')
      .then(res => {
        setStaff(res.data);
        setFilteredStaff(res.data); // Initialize filteredStaff with all staff
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/deletestaff/${id}`)
      .then(res => {
        const newStaff = staff.filter(s => s.id !== id);
        setStaff(newStaff);
        setFilteredStaff(newStaff); // Update filteredStaff after deletion
        alert(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  }

  const handleAddStaff = () => {
    const currentDate = formData.isPresent ? new Date().toLocaleDateString() : ''; // Get current date if present
    const newStaffMember = {
      name: formData.name,
      role: formData.role,
      date: currentDate
    };

    axios.post('/api/addstaff', newStaffMember)
      .then(res => {
        setStaff([...staff, newStaffMember]);
        setFilteredStaff([...filteredStaff, newStaffMember]); // Update filteredStaff after addition
        alert(res.data);
        setFormData({ // Clear form data after submission
          name: '',
          role: '',
          isPresent: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   const filtered = staff.filter(s => 
  //     s.name.toLowerCase().includes(query) ||
  //     (s.date && s.date.includes(joinDateQuery.toISOString().split('T')[0])) // Convert joinDateQuery to match DATE type
  //   );
  //   setFilteredStaff(filtered);
  // }

  
  const handleJoinDateQueryChange = (e) => {
    const dateQuery = new Date(e.target.value);
    setJoinDateQuery(dateQuery);
    const filtered = staff.filter(s =>
      s.name.toLowerCase().includes(formData.name.toLowerCase()) &&
      (s.date && s.date.toISOString().split('T')[0].includes(dateQuery.toISOString().split('T')[0])) // Convert date to match DATE type
    );
    setFilteredStaff(filtered);
  }

  const getRoleName = (role) => {
    switch (role) {
      case '1':
        return 'Cashier';
      case '2':
        return 'Cook';
      case '3':
        return 'Supplier';
      default:
        return '';
    }
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center',  justifyContent: 'center'}} >
        <div className='form'><input
          type="text"
          className='inputBox'
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          />
        <select
          name="role"
          className='inputBox'
          value={formData.role}
          onChange={handleInputChange}
          required
          >
          <option value="">Select Role</option>
          <option value="1">Cashier</option>
          <option value="2">Cook</option>
          <option value="3">Supplier</option>
        </select>
        <label>
          Present:
          <input
            type="checkbox"
            // className='inputBox'
            name="isPresent"
            checked={formData.isPresent}
            onChange={handleCheckboxChange}
            />
          <br /><br />
        </label>
        <button  className='inputButton' onClick={handleAddStaff}>Add Staff</button></div><br /><br /><br />
            </div>
        
        <div> <Piestaff /></div>
     
      </div><br /><br />
      {/* <input
        className='inputBox'
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
      /> */}
      {/* <input
        type="date"
        placeholder="Search by join date"
        value={joinDateQuery}
        onChange={handleJoinDateQueryChange}
      /> */}

      <h2 className='label' style={{textAlign: 'center'}}>Staff List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Join Date</th> {/* Display join date */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.name}</td>
              <td>{getRoleName(staffMember.role)}</td>
              <td>{staffMember.date}</td> {/* Display '-' if no join date */}
              <td>
                <button onClick={() => handleDelete(staffMember.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default StaffManager;
