import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Updatefood(props) {
  
  const [data, setData] = useState({product_image: '', product_name: '', brand_id: '', categories_id: '', rate: '', active: '', status: '', quantity: ''})
  const [error, setError] = useState('')
  

  if (!props.prop) {
    throw new Error('login and try again');
  }

  const id = window.location.pathname.split('/')[2] // get product id

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/getfood/` + id)
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
      product_image: data.product_image,
      product_name: data.product_name,
      brand_id: data.brand_id,
      categories_id: data.categories_id,
      rate: data.rate,
      active: data.active,
      status: data.status,
      quantity: data.quantity

   
    }

    try {
      console.log('ID:', id);
console.log('Data:', newdata);

      const res = await axios.put(`/api/updatefood/`+ id, newdata)
      alert(res.data)
      window.location.href = '/food'
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <div className="content" style={{width: '50%', margin: '20px auto',paddingLeft: '10%',justifyContent : 'center',justifyItems: 'center'}}>
      <h2 style={{paddingLeft: '25%', fontSize: '24px', marginBottom: '20px'}}>Update Product</h2>
      {error && <p className='alert alert-danger' style={{textAlign: 'center'}}>{error}</p>}
      <form className='form' onSubmit={handleSubmit} style={{marginTop: '20px'}}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="inputBox" placeholder='Enter Name' id="name" value={data.product_name} onChange={(e) => setData({...data, product_name: e.target.value})}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="inputBox" placeholder='Enter Image' id="image" onChange={(e) => setData({...data, product_image: e.target.files[0]})}/>
        </div>
          <label style={{color:"white"}} htmlFor="brand_id">Brand</label><br />
          <input type="text" className="inputBox" id="brand_id" value={data.brand_id} onChange={(e) => setData({...data, brand_id: e.target.value})}/>

          <label htmlFor="categories_id" style={{color:"white"}}>Category</label><br />
          <select name="categories_id" className='inputBox' value={data.categories_id} onChange={(e) => setData({...data, categories_id: e.target.value})}>
            <option value="0">Product</option>
            <option value="1">Menu</option>
          </select>
        
          <label htmlFor="quantity" style={{color:"white"}}>Quantity</label><br />
          <input type="number" className="inputBox" placeholder='Enter Quantity' id="quantity" value={data.quantity} onChange={(e) => setData({...data, quantity: e.target.value})}/>

          <label htmlFor="rate" style={{color:"white"}}>Rate</label><br />
          <input type="number" className="inputBox" placeholder=' Enter Rate' id="rate" value={data.rate} onChange={(e) => setData({...data, rate: e.target.value})}/>

          {/* <label htmlFor="active" style={{color:"white"}}>Active</label><br />
          <select className="inputBox" id="active" aria-placeholder='Select' value={data.active} onChange={(e) => setData({...data, active: e.target.value})}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> */}

          {/* <label htmlFor="status" style={{color:"white"}}>Status</label><br />
          <select className="inputBox" id="status" aria-placeholder='Select' value={data.status} onChange={(e) => setData({...data, status: e.target.value})}>
            <option value="1">Available</option>
            <option value="0">Out of Stock</option>
          </select> */}

        

        <button type="submit" className="btn btn-primary btn-block" style={{marginTop: '20px'}}>Submit</button>
      </form>
    </div>
  )
}

export default Updatefood





