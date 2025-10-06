import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (posts.length === 0) {
    return (
      <div className="post-list">
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>Start by creating your first blog post!</p>
          <Link to="/create" className="btn btn-primary">
            Create First Post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h1>Blog Posts</h1>
        <Link to="/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id || post._id} className="post-card">
            <div className="post-card-header">
              <h2 className="post-title">
                <Link to={`/post/${post.id || post._id}`}>
                  {post.title}
                </Link>
              </h2>
              <div className="post-meta">
                <span className="post-author">By {post.author}</span>
                <span className="post-date">
                  {formatDate(post.createdAt || post.updatedAt)}
                </span>
              </div>
            </div>
            
            <div className="post-content-preview">
              <p>{truncateContent(post.content)}</p>
            </div>
            
            <div className="post-card-footer">
              <Link to={`/post/${post.id || post._id}`} className="btn btn-outline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
