import React, { useState } from 'react';
import axios from 'axios';
import '../css/table.css';

const Addfood = ( props ) => {
    const [inputValue, setInputValue] = useState({
        product_name: '',
        product_image: '',
        brand_id:'',
        category:'',
        quantity: '',
        rate: '',
        active: '',
        status: '',
    });

    if (!props.prop) {
        throw new Error('login and try again');
        
      }
    const handleInputChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setInputValue({
            ...inputValue,
            product_image: e.target.files[0],
        });
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', inputValue.product_image);
            const res = await axios.post('/api/upload', formData);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const imageUrl = await uploadImage();
            console.log(imageUrl+"image url");

            const formData = {
                product_name: inputValue.product_name,
                product_image: imageUrl,
                brand_id: inputValue.brand_id,
                category: inputValue.category,
                quantity: inputValue.quantity,
                rate: inputValue.rate,
                active: inputValue.active,
                status: inputValue.status,
            }
            console.log(formData);
            const response =  axios.post('/api/addfood', formData);         
            alert('Food added successfully!');
            window.location.href = '/food';
            
           
        } catch (error) {
            console.error('Error adding food:', error);
            alert('Error adding food. Please try again later.');
        }
    };

    
        if (!props) {
            throw new Error('login and try again');
          }
    
        return(
            <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <form className="form">
                    <h1>Add Product</h1>
                    <br /><br />
                    {/* <label>product_name: </label> */}
                    <input type="text" placeholder='Enter product name' className='inputBox' name="product_name" value={inputValue.product_name} onChange={handleInputChange} /><br />
                    
    
                    {/* <label className="label">product_image: </label> */}
                    <input type="file" className='inputBox' name="product_image" onChange={handleImageChange} required /><br />
    
                    <label>brand_id: </label>
                    <input type="text" placeholder='Enter brand id' className='inputBox' name="brand_id" value={inputValue.brand_id} onChange={handleInputChange}  /><br />
    
    
                    {/* <label htmlFor="category"> category:</label> */}
                    <select name="category" className='inputBox' placeholder='Enter category' value={inputValue.category}>
                        <option value="1">menu</option>
                        <option value="0">product</option>
                    </select>
    
                    {/* <label>quantity:</label> */}
                    <input type="text" className='inputBox' placeholder='Enter quantity' name="quantity" value={inputValue.quantity} onChange={handleInputChange} /><br />
    
                    {/* <label>rate: </label> */}
                    <input type="text" className='inputBox' placeholder='Enter rate'  name="rate" value={inputValue.rate} onChange={handleInputChange} /><br />
    
                    {/* <label>active: </label> */}
                    {/* <input type="text" name="active" value={inputValue.active} onChange={handleInputChange} /><br /> */}
    
                    
    
                    <button type="button" className='btn' onClick={handleAddData}>Add</button>
                </form>
            </div>
        )
    
}

export default Addfood;

