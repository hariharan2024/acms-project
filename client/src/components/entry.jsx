import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import { BsStarFill } from "react-icons/bs";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  useEffect(() => {
    Axios.get('/api/food')
      .then(response => {
        setProducts(response.data);
        // setFilteredProducts(response.data); // Initialize filteredProducts with all products
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter(item =>
      item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCheckNow = async (cartItems) => {
    if (!cartItems.length) {
      alert('No items in cart');
      return;
    }

    const orderData = cartItems.map(item => ({
      product_id: item.product_id,
      product_name: item.product_name,
      rate: item.rate,
      quantity: item.quantity,
    }));

    const email = 'admin@email.com';
    const t = new Date().toLocaleString();
    const phone = '';
    const status = '1';
    const token = null;

    try {
      const response = await Axios.post(`/api/checkout`, { email, phone, did: orderData, t, status, token });

      console.log('Order placed successfully!');
      alert('Order placed successfully!');
      window.location.reload();

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const generateBill = () => {
    const totalCost = cartItems.reduce((total, item) => total + (item.rate * item.quantity), 0);
    const taxRate = 0.12;
    const taxAmount = totalCost * taxRate;
    const totalAmount = totalCost + taxAmount;

    alert(`
    Total Cost: Rs.${totalCost.toFixed(2)}
    Tax (12%): Rs.${taxAmount.toFixed(2)}
    Total Amount (Including Tax): Rs.${totalAmount.toFixed(2)}
    `);
  };

  const menucategory = (category) => {
    const fil = products.filter(item => item.category === category);
    setFilteredProducts(fil); // Initialize filteredMenu with filtered items
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  const handleAddToCart = (item, quantity) => {
    setCartItems([...cartItems, { ...item, quantity: quantity }]);
  };

  const calculateAvailableQuantity = (productId) => {
    const product = products.find(item => item.product_id === productId);
    if (!product) return 0;

    const cartProducts = cartItems.filter(item => item.product_id === productId);
    const totalQuantityInCart = cartProducts.reduce((total, item) => total + item.quantity, 0);

    return product.quantity - totalQuantityInCart;
  };




  // console.log(cartItems,"sdfghjkjhfdfghjsdfghjkjhgfds");

  return (
    <>
      <section className="menu" id="menu">
        <button className="btn" onClick={() => menucategory(0)}>Menu</button>
        <button className="btn" onClick={() => menucategory(1)}>product</button>
        <h1 className="heading" style={{ color: "green" }}>
          Our <span>Products<Search handleSearch={handleSearch} /></span>
        </h1>

        <div className="box-container">
          {filteredProducts.map((item, index) => (
            <div className="box" key={item.product_id}>
              <img
                src={item.product_image ? `/${item.product_image}` : null}
                alt=""
              />
              <h3>{item.product_name}</h3>
              <div className="price">
                Rs.{item.rate} <span>Rs.{item.rate * 1.2}</span>
              </div>
              <input
  type="number"
 style={{ width: '160px', height: '30px' }}
  min="1"
  
  defaultValue="1"
  max={calculateAvailableQuantity(item.product_id)} // Set max dynamically
  value={productQuantities[item.product_id] || ''}
  onChange={(e) => {
    let quantity = parseInt(e.target.value, 10);
    const maxQuantity = calculateAvailableQuantity(item.product_id);
    if (quantity > maxQuantity) {
      quantity = maxQuantity; // Ensure quantity doesn't exceed available quantity
    }
    setProductQuantities(prevState => ({
      ...prevState,
      [item.product_id]: quantity
    }));
  }}
/>

              <p style={{ color: "white" }}>Quantity: {calculateAvailableQuantity(item.product_id)}</p>
              <button
                className="btn"
                onClick={() => handleAddToCart(item, productQuantities[item.product_id] || 1)}
                disabled={calculateAvailableQuantity(item.product_id) <= 0}
              >
                {calculateAvailableQuantity(item.product_id) <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <br />
              <br />
            </div>
          ))}
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleCheckNow(cartItems); }}>Checkout</button>
        <button className="btn btn-primary" onClick={generateBill}>Generate Bill</button>
      </section>
      <section>
        <h1 className="heading" style={{ color: "green" }}>
          Your Cart
        </h1>
        <div className="box-container">
          {cartItems.map((item, index) => (
            <div className="box" key={index}>
              <h3>{item.product_name}</h3>
              <div className="price">
                Rs.{item.rate} <span>Rs.{item.rate * 1.2}</span>
              </div>
              <p>Quantity: {item.quantity}</p>
              <button className="btn" onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductComponent;
