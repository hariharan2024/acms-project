import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from  './search'; // assuming Search component is in the same directory

function ReviewPage(props) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  if (!props.prop) {
    throw new Error('login and try again');
  }

  useEffect(() => {
    axios.get('/api/getreview')
      .then(res => {
        setReviews(res.data);
        setFilteredReviews(res.data); // Initialize filteredReviews with all reviews
      })
      .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      axios.delete(`/api/deletereview/${id}`)
        .then(() => {
          const newReviews = reviews.filter(review => review.id !== id);
          setReviews(newReviews);
          setFilteredReviews(newReviews); // Update filteredReviews after deletion
        })
        .catch(err => console.log(err));
    }
  };

  const handleSearch = (query) => {
    const filtered = reviews.filter(review =>
      review.user_name.toLowerCase().includes(query.toLowerCase()) ||
      review.comment.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const handleSort = (key) => {
    let sortedReviews = [...filteredReviews];
    if (key === sortKey) {
      sortedReviews.reverse();
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      sortedReviews.sort((a, b) => {
        if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setSortOrder('asc');
      setSortKey(key);
    }
    setFilteredReviews(sortedReviews);
  };

  return (
    <div>
      <h1>Reviews</h1>
      <Search handleSearch={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>product name</th>
            <th onClick={() => handleSort('user_name')}>Name</th>
            <th onClick={() => handleSort('rating')}>Rating</th>
            <th onClick={() => handleSort('comment')}>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map(review => (
            <tr key={review.id}>
              <td>{review.name}</td>
              <td>{review.user_name||"geust user"}</td>
              <td>
                {Array.from({ length: review.rating }, (_, i) => (
                  <i className="fa fa-star" key={i} />
                ))}
              </td>
              <td>{review.comment||"no comment"}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(review.id)}><i className="fa fa-trash"></i> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReviewPage;
