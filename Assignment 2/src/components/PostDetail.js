import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostDetail = ({ post, onDelete }) => {
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="post-detail">
        <div className="error-state">
          <h2>Post not found</h2>
          <p>The post you're looking for doesn't exist or has been deleted.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      onDelete(post.id);
      navigate('/');
    }
  };

  const isRecentlyModified = () => {
    const created = new Date(post.createdAt);
    const modified = new Date(post.lastModified);
    const timeDiff = modified.getTime() - created.getTime();
    return timeDiff > 1000; // More than 1 second difference
  };

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <Link to="/" className="btn btn-secondary">
          ← Back to Posts
        </Link>
        
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-outline">
            Edit Post
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete Post
          </button>
        </div>
      </div>

      <article className="post-content">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="post-author">
              <strong>By {post.author}</strong>
            </div>
            
            <div className="post-dates">
              <div className="post-date">
                <span className="label">Published:</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              
              {isRecentlyModified() && (
                <div className="post-date">
                  <span className="label">Last modified:</span>
                  <span>{formatDate(post.lastModified)}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="post-body">
          <div className="post-text">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
