import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import useAxios from '../../hooks/useAxios';

function Posts() {
    const [posts, setPosts] = useState([]);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const axios = useAxios();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');  
            return;  
        }

        axios.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, [axios, isLoggedIn, navigate]);

    return (
      <div className="container mt-4">
      {posts.map(post => (
          <div key={post.id} className="card mb-3">
              <img src={post.media} className="card-img-top" alt={post.title} style={{ maxHeight: '400px', objectFit: 'cover' }} />
              <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                  <p className="card-text">
                      <small className="text-muted">Created: {new Date(post.created).toLocaleDateString()}</small>
                      <small className="text-muted ms-2">Last Updated: {new Date(post.updated).toLocaleDateString()}</small>
                  </p>
                  <div className="mb-2">
                      {post.tags.map((tag, index) => (
                          <span key={index} className="badge bg-secondary me-1">{tag}</span>
                      ))}
                  </div>
                  <div className="d-flex justify-content-between">
                      <span className="badge bg-info">Comments: {post._count.comments}</span>
                      <span className="badge bg-primary">Reactions: {post._count.reactions}</span>
                  </div>
              </div>
          </div>
      ))}
  </div>
    );
}

export default Posts;


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { POSTS_URL } from '../../constants/apiUrl';

function Posts() {
  const [posts, setPosts] = useState([]);
const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(POSTS_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Fetch posts error:', error.response?.data || error.message);
        }
      }
    };
    fetchPosts();
  }, [isAuthenticated]);

  return (
    <div className="container mt-5">
      {posts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;*/
