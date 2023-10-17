import React, { useState } from 'react';
import axios from 'axios';

function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

    const fetchComments = ()=>{
        // Fetch comments for the given postId
        axios.get(`http://localhost:3001/comments/${postId}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
        });
    }
    
  

  const handleSubmit = () => {
    // Submit a new comment
    axios.post('http://localhost:3001/comments', { text: newComment, postId })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error creating comment:', error);
      });
  };

  

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
      <br />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={fetchComments}>Add</button>
      <button onClick={handleSubmit}>show</button>
    </div>
  );
}

export default Comment;
