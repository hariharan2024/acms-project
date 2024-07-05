import React, { useState, useEffect } from 'react'
import axios from 'axios'


function UpdateCust(props) {

  if (!props.prop) {
    throw new Error('login and try again');
    
  }
  
  const [data, setData] = useState({'username': '', 'email': '', 'phone': ''})
  const [error, setError] = useState('')

  const id = window.location.pathname.split('/')[2] // get customer id

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/getcust/` + id)
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newdata = {
      username: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value
   
    }

    try {
      console.log('ID:', id);
      console.log('Data:', newdata);

      const res = await axios.put(`/api/updatecust/`+ id, newdata)
      alert(res.data)
      window.location.href = '/cust'
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <div className="content" style={{width: '50%', margin: '20px auto',justifyContent: 'center',justifyItems: 'center',paddingLeft: '10%'}}>
      <h2 style={{paddingLeft: '25%', fontSize: '24px', marginBottom: '20px',justifyContent: 'center',justifyItems: 'center'}}>Update Customer</h2>
      {error && <p className='alert alert-danger' style={{textAlign: 'center'}}>{error}</p>}
      <form className='form' onSubmit={handleSubmit} style={{marginTop: '20px'}}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="inputBox" id="name" name="name" defaultValue={data.username}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="inputBox" id="email" name="email" defaultValue={data.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="number" className="inputBox" id="phone" name="phone" defaultValue={data.phone}/>
        </div>
       

        <button type="submit" className="btn btn-primary btn-block" style={{marginTop: '20px'}}>Submit</button>
      </form>
    </div>
  )
}

export default UpdateCust

