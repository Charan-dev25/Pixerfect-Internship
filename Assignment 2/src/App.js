import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createPost, updatePost } from './utils/postUtils';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import './App.css';

// Component that uses useParams to get the post ID
const PostDetailWithParams = ({ posts, onDelete }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  return <PostDetail post={post} onDelete={onDelete} />;
};

// Component that uses useParams to get the post ID for editing
const PostEditWithParams = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  
  const handleSubmit = (formData) => {
    onUpdate(id, formData);
  };
  
  return (
    <PostForm 
      post={post}
      onSubmit={handleSubmit}
      onCancel={() => window.history.back()}
    />
  );
};

function App() {
  const [posts, setPosts] = useLocalStorage('blog-posts', []);

  // Create a new post
  const handleCreatePost = (formData) => {
    const newPost = createPost(formData.title, formData.author, formData.content);
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Update an existing post
  const handleUpdatePost = (postId, formData) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? updatePost(post, formData)
          : post
      )
    );
  };

  // Delete a post
  const handleDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>
              <a href="/">My Blog</a>
            </h1>
            <nav>
              <a href="/">Home</a>
              <a href="/create">Create Post</a>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <Routes>
              {/* Home page - List all posts */}
              <Route 
                path="/" 
                element={<PostList posts={posts} />} 
              />
              
              {/* Create new post */}
              <Route 
                path="/create" 
                element={
                  <PostForm 
                    onSubmit={handleCreatePost}
                    onCancel={() => window.history.back()}
                  />
                } 
              />
              
              {/* View single post */}
              <Route 
                path="/post/:id" 
                element={<PostDetailWithParams posts={posts} onDelete={handleDeletePost} />} 
              />
              
              {/* Edit existing post */}
              <Route 
                path="/edit/:id" 
                element={<PostEditWithParams posts={posts} onUpdate={handleUpdatePost} />} 
              />
              
              {/* Redirect any other routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2024 My Blog. Built with React.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;