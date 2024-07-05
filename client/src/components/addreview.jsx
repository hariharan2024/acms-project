import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from 'react-star-ratings'; // Importing star rating component
import { AuthContext } from '../context/authcontext';

const AddReview = (props) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: ''
  });
  const { currentUser } = useContext(AuthContext);

  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/getfood/` + productId);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [productId]);

  const product_image = product ? product.product_image : null;

  const handleRatingChange = (newRating) => {
    setReview(prevState => ({
      ...prevState,
      rating: newRating
    }));
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setReview(prevState => ({
      ...prevState,
      comment: value
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const newReview = {
      ...review,
      product_id: currentUser ? currentUser.username : null,
      product_name: product ? product.product_name : 'Loading...'
    };

    try {
      await axios.post('/api/addreview', newReview);
      alert('Review Added');
      window.location.href = '/products';
    } catch (err) {
      console.log(err);
    }
    
    setReview({
      rating: 0,
      comment: ''
    });
  };
  
  return (<><h1>Review Page</h1>
  <div className='container'>
      
      <form onSubmit={handleSubmitReview} className="form">
        <div >
          <div style={{ textAlign: 'center' }}>
            <h1 >{product ? product.product_name : 'Loading...'}</h1>
            <img style={{ width: '200px', height: '200px', justifyItems: 'center' }} src={product_image ? `/${product_image}` : null} alt="" />
          </div>
          {/* <label htmlFor="rating">Rating:</label> */}
          {/* Star rating component */}
          <br />
          <StarRating
            name="rating"
            rating={review.rating}
            starRatedColor="goldorange" // Customize star color
            changeRating={handleRatingChange}
            />
            <br /><br /><br />
        </div>
        <div className='inputContainer'>
          {/* <label htmlFor="comment">Comment:</label> */}
          <textarea
            id="comment"
            name="comment"
            value={review.comment}
            placeholder='Enter your comment here'
            onChange={handleCommentChange}
            className='inputBox'
            />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div></>
  );
};

export default AddReview;
