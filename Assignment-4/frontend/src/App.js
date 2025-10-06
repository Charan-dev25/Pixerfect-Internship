import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { PostsAPI } from './api/client';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import './App.css';

// Component that uses useParams to get the post ID
const PostDetailWithParams = ({ posts, onDelete }) => {
  const { id } = useParams();
  const post = posts.find(p => (p.id || p._id) === id);
  return <PostDetail post={post} onDelete={onDelete} />;
};

// Component that uses useParams to get the post ID for editing
const PostEditWithParams = ({ posts, onUpdate }) => {
  const { id } = useParams();
  const post = posts.find(p => (p.id || p._id) === id);
  
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    PostsAPI.list()
      .then(items => {
        if (!mounted) return;
        // normalize to have id field for UI components
        const normalized = items.map(p => ({ ...p, id: p._id || p.id }));
        setPosts(normalized);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Create a new post
  const handleCreatePost = async (formData) => {
    const created = await PostsAPI.create({ title: formData.title, content: formData.content });
    const normalized = { ...created, id: created._id || created.id };
    setPosts(prev => [normalized, ...prev]);
  };

  // Update an existing post
  const handleUpdatePost = async (postId, formData) => {
    const updated = await PostsAPI.update(postId, { title: formData.title, content: formData.content });
    const normalized = { ...updated, id: updated._id || updated.id };
    setPosts(prev => prev.map(p => (p.id === postId ? normalized : p)));
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    await PostsAPI.remove(postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
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
            {error && <div className="error-state"><p>{error}</p></div>}
            {loading && <p>Loading...</p>}
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