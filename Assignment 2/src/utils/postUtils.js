// Utility functions for managing blog posts

// Generate a unique ID for posts
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create a new post object
export const createPost = (title, author, content) => {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: title.trim(),
    author: author.trim(),
    content: content.trim(),
    createdAt: now,
    lastModified: now
  };
};

// Update an existing post
export const updatePost = (post, updates) => {
  return {
    ...post,
    ...updates,
    lastModified: new Date().toISOString()
  };
};

// Validate post data
export const validatePost = (post) => {
  const errors = {};
  
  if (!post.title || post.title.trim() === '') {
    errors.title = 'Title is required';
  }
  
  if (!post.author || post.author.trim() === '') {
    errors.author = 'Author is required';
  }
  
  if (!post.content || post.content.trim() === '') {
    errors.content = 'Content is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
