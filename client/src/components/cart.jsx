import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authcontext';
import axios from 'axios';

const Cart = ({ cartItems, removeFromCart, calculateTotal, handleCheckNow }) => {
  const { currentUser } = useContext(AuthContext);
  const [discountedCartItems, setDiscountedCartItems] = useState(cartItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const orderHistoryResponse = await axios.get(`/api/getord/${currentUser.email}`);
          const orderHistoryData = orderHistoryResponse.data;

          // console.log("Order History Data:", orderHistoryData.length);

          let orderHistoryProductCount = 0;
          orderHistoryData.forEach(order => {
            try {
              const products = JSON.parse(order.pname);
              orderHistoryProductCount += products.length;
            } catch (error) {
              console.error("Error parsing pname:", error);
            }
          });

          // console.log("Order History Product Count:", orderHistoryProductCount);

          const offerResponse = await axios.get("/api/getoffer");
          const offerData = offerResponse.data;
          // console.log("Offer Data:", offerData);

          // Check if the user is eligible for disc
          if (offerData && offerData.quanty && orderHistoryProductCount >= offerData.quanty) {
            console.log("User is eligible for disc!");
            const discountedCartItems = cartItems.map(item => {
              const discountedItem = {...item};
              discountedItem.rate = item.rate - (item.rate * (offerData.disc / 100));
              return discountedItem;
            });
            setDiscountedCartItems(discountedCartItems);
            
          } else {
            setDiscountedCartItems(cartItems);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log("Response Data:", error.response.data); // Log response data for debugging
      }
    };

    fetchData();
  }, [currentUser, cartItems]);

  // console.log("Discounted Cart Items:", discountedCartItems);

  return (
    <div className="cart-container">
      {/* Your cart rendering logic */}
      {discountedCartItems ? (
        // console.log("Discounted Cart Itemaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas:", discountedCartItems),
        <div className="cart">
          <br />
          <br />
          <br />
          <br />
          <h2>Cart</h2>
          <br />
          <button className="btn" onClick={() => window.confirm('Confirm to proceed to checkout?') ? handleCheckNow(discountedCartItems, currentUser) : null}>Check now</button>

          <ul>
            {discountedCartItems.map((item, index) => (
              <li key={index}>
                {item.product_name} - ₹{item.rate}
                <button onClick={() => removeFromCart(index)}>Remove</button><br /><br />
              </li>
            ))}
          </ul> <br />
          <div>Total: ₹{calculateTotal(discountedCartItems)}</div>
        </div>
      ) : (
        <div className="empty-cart">
          <br />
          <br />
          <br />
          <br />

          <h2>Cart</h2>
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;

