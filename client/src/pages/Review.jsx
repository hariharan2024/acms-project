import React, { useState, useEffect } from "react";
import axios from "axios";
import qouteImg from "../assets/images/quote-img.png";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Search from "../components/search";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/getreview");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const userIds = reviews.map((review) => review.product_id);
      const uniqueUserIds = Array.from(new Set(userIds)); // Get unique user IDs
      const userRequests = uniqueUserIds.map((id) =>
        axios.get(`/api/getcust/${id}`)
      );

      try {
        const responses = await Promise.all(userRequests);
        const usersData = responses.reduce((acc, response, index) => {
          const userId = uniqueUserIds[index];
          acc[userId] = response.data;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (reviews.length > 0) {
      fetchUsers();
    }
  }, [reviews]);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  const handleSearch = (query) => {
    const filtered = reviews.filter((review) =>
      review.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  if (reviews.length === 0) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <br />
      <br />
      <section className="review" id="review">
        <h1 className="heading">
          customer's <span>review</span>
          <Search handleSearch={handleSearch} />
        </h1>

        <div className="box-container">
          {filteredReviews.map((review, index) => (
            <div className="box" key={index}>
              <img src={qouteImg} alt="" className="quote" /><br /><br />
              {Array.from({ length: review.rating }, (_, i) => (
                <i className="fa fa-star" key={i} style={{color: 'gold'}} />
              ))}
              <p>Product Name: {review.name}</p>
              <p>{review.comment}</p>
              {review.user_name ? <p>Customer Name: {review.user_name}</p> : <p>Customer Name: Guest User</p>}
              {/* {users[review.product_id] && ( */}
                {/* <div> */}
                  {/* <p>Customer Name: {users[review.product_id].username}</p> */}
                  {/* <p>Customer Email: {users[review.product_id].email}</p> */}
                {/* </div> */}
              {/* )} */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Review;
