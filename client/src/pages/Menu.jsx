import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Search from '../components/search';
import { BsStarFill } from "react-icons/bs"; // Import Bootstrap icon
import { Link } from 'react-router-dom';

const menu = ({ addToCart, cartItems }) => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    Axios.get('/api/food')
      .then(response => {
        setMenu(response.data);

        // Filter menu if category is 1
        const filtered = response.data.filter(item => item.category == 0);
        setFilteredMenu(filtered); // Initialize filteredMenu with filtered items
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredMenu(menu); // Reset filteredMenu to the original menu when the query is empty
    } else {
      const filtered = menu.filter(item =>
        item.product_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenu(filtered);
    }
  };

  // Function to add item to cart and send it to the parent component
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // Function to calculate available quantity of a product
// Function to calculate available quantity of a product
const calculateAvailableQuantity = (productId) => {
  const product = menu.find(item => item.product_id === productId);
  if (!product) return 0;

  // Find all occurrences of the product in the cart
  const cartProducts = cartItems.filter(item => item.product_id === productId);
  // console.log(cartProducts.length);
  
  // Calculate total quantity in the cart
  const totalQuantityInCart = cartProducts.length;
  
  return product.quantity - totalQuantityInCart;
};


  return (
    <>
      <br />
      <br />
      <section className="menu" id="menu">
        <h1 className="heading">
          our <span>menu<Search handleSearch={handleSearch} /></span>
        </h1>

        <div className="box-container">
          {filteredMenu.map((item, index) => (
            <div className="box" key={item.product_id}>
              <img
                src={item.product_image ? `/${item.product_image}` : null}
                alt=""
              />
              <h3>{item.product_name}</h3>
              <div className="price">
                rs.{item.rate} <span>rs.{item.rate * 1.2}</span>
              </div>
              <p style={{color: "white" }}>Quantity: {calculateAvailableQuantity(item.product_id)}</p>
              {/* Disable the button if cartItem quantity exceeds product quantity */}
              <button
                className="btn"
                onClick={() => handleAddToCart(item)}
                disabled={calculateAvailableQuantity(item.product_id) <= 0}
              >
                
                {calculateAvailableQuantity(item.product_id) <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <br />
             
             <Link to={`/addreview/${item.product_id}`} className="btn btn-primary">
               <BsStarFill /> add review
             </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default menu;
