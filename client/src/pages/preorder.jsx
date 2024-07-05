// Import React and other necessary libraries
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/authcontext";

const Preorder = () => {
  // State variables
  const [preorders, setPreorders] = useState([]);
  const [selectedPreorder, setSelectedPreorder] = useState(null);
  const [pickupDatetime, setPickupDatetime] = useState(new Date());
  const [orderDate, setOrderDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedRate, setSelectedRate] = useState(0);
  const { currentUser } = useContext(AuthContext);

  // Fetch preorders data from the API
  useEffect(() => {
    axios.get('/api/getpreorder')
      .then(response => {
        setPreorders(response.data);
      })
      .catch(error => {
        console.error('Error fetching preorders:', error);
      });
  }, []);

  // Event handlers
  const handlePreorderSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedPreorder = preorders.find(preorder => preorder.id === selectedId);
    if (selectedPreorder) {
      setSelectedPreorder(selectedPreorder);
      setSelectedRate(selectedPreorder.price);
    }
  };

  const handleAddToCart = () => {
    if (selectedPreorder) {
      const itemToAddToCart = {
        id: selectedPreorder.id,
        name: selectedPreorder.name,
        price: selectedPreorder.price,
        quantity: parseInt(quantity), // Ensure quantity is parsed as an integer
        pickupDatetime,
        orderDate,
      };
      setCartItems([...cartItems, itemToAddToCart]);
      console.log('Item added to cart:', itemToAddToCart);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCartItemDelete = (indexToRemove) => {
    
      const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
      setCartItems(updatedCart); 
    


  
  };

  const handleCheckNow = async () => {
    if (!cartItems.length) {
      alert('No items in cart');
      return;
    }

    const orderData = cartItems.map(item => ({
      product_id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      pickupDatetime: item.pickupDatetime,
      orderDate: item.orderDate,
     

    }));
    const  email = currentUser?.email || null
      const  phone = currentUser?.phone || null
    // console.log(orderData);

    try {
      const response = await axios.post('/api/preorder', { orderData ,email,phone});

      console.log('Order placed successfully!');
      alert('Order placed successfully!');
      // window.location.reload();

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ color: '#ffc107' }}>Preorder</h2><br />
      <form className='form'>
        {/* <label htmlFor="preorderSelect">Select Preorder:</label> */}
        <select  id="preorderSelect"  className='inputBox'onChange={handlePreorderSelect}>
          <option value="">Select a preorder</option>
          {preorders.map(preorder => (
            <option key={preorder.id} value={preorder.id}>{preorder.name}</option>
          ))}
        </select>
        <br />
        <label className='label'>Rate:</label> {selectedPreorder && <span className='inputBox'>{selectedPreorder.price}</span>}
        <br />
        <label className='label' htmlFor="pickupDatetime">Pickup Datetime:</label>
        <input  className='inputBox' type="datetime-local" id="pickupDatetime" value={pickupDatetime.toISOString()} onChange={(e) => setPickupDatetime(new Date(e.target.value))} />
        <br />
        {/* <label htmlFor="orderDate">Order Date:</label>
        <input type="date" id="orderDate" value={orderDate.toISOString().slice(0, 10)} onChange={(e) => setOrderDate(new Date(e.target.value))} />
        <br /> */}
        <label className='label' htmlFor="quantity">Quantity:</label>
        <input type="number" className='inputBox' id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <br />
        <button type="button" className='inputButton' onClick={handleAddToCart} disabled={!selectedPreorder}>Add to Cart</button>
        <button type="button" className='inputButton' onClick={toggleCart}>Show/Hide Cart</button>
        <button type="button" className='inputButton' onClick={handleCheckNow}>Check Now</button>
      </form><br />
      {showCart && (
        <div className='cart' style={{ backgroundColor: 'lightgray',display: 'flex', flexDirection: 'column', alignItems: 'center',borderRadius: '10px' }} >
          <h3 style={{ color: 'black', textAlign: 'center' }}>Cart Items</h3><br />
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} 
                <button type="button" onClick={() => handleCartItemDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Preorder;

