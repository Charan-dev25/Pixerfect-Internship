# React Blog App

A fully functional CRUD (Create, Read, Update, Delete) blog application built with React, featuring client-side routing and localStorage persistence.

## Features

### Core Requirements ✅
- **Create Posts**: Form to add new blog posts with title, author, and content
- **Read Posts**: Homepage displays all posts with title and author
- **Read Single Post**: Click to view full post details
- **Update Posts**: Edit existing posts with pre-filled forms
- **Delete Posts**: Remove posts with confirmation dialog
- **Data Persistence**: All data saved in browser localStorage

### Bonus Features ✅
- **Form Validation**: Required field validation with error messages
- **Confirmation Dialog**: Delete confirmation using `window.confirm`
- **Custom Hook**: `useLocalStorage` hook for state synchronization
- **Timestamps**: Automatic `createdAt` and `lastModified` timestamps

## Tech Stack

- **React** 19.1.1
- **React Router DOM** for client-side routing
- **Custom Hooks** for localStorage management
- **Modern CSS** with responsive design
- **Browser localStorage** for data persistence

## Project Structure

```
src/
├── components/
│   ├── PostForm.js      # Reusable form for create/edit
│   ├── PostList.js      # Homepage post listing
│   └── PostDetail.js    # Single post view with actions
├── hooks/
│   └── useLocalStorage.js # Custom hook for localStorage
├── utils/
│   └── postUtils.js     # Post utilities and validation
├── App.js               # Main app with routing
├── App.css              # Modern styling
└── index.js             # App entry point
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open browser**: Navigate to `http://localhost:3000`

## Usage

### Creating a Post
1. Click "Create New Post" button
2. Fill in title, author, and content
3. Click "Create Post"

### Viewing Posts
- **Homepage**: See all posts in a grid layout
- **Single Post**: Click "Read More" or post title

### Editing a Post
1. Navigate to a post detail page
2. Click "Edit Post" button
3. Modify the form fields
4. Click "Update Post"

### Deleting a Post
1. Navigate to a post detail page
2. Click "Delete Post" button
3. Confirm deletion in the dialog

## Features in Detail

### Form Validation
- Title, author, and content are required
- Real-time error messages
- Prevents submission of invalid data

### Data Persistence
- All posts automatically saved to localStorage
- Data persists between browser sessions
- Custom `useLocalStorage` hook manages state synchronization

### Responsive Design
- Mobile-friendly layout
- Grid system adapts to screen size
- Touch-friendly buttons and forms

### User Experience
- Smooth transitions and hover effects
- Loading states for form submissions
- Clear navigation and breadcrumbs
- Empty states for better UX

## Browser Compatibility

- Modern browsers with ES6+ support
- localStorage support required
- Responsive design works on all screen sizes

## Future Enhancements

Potential improvements for future versions:
- Search and filter functionality
- Categories and tags
- Rich text editor
- Image uploads
- User authentication
- Comments system
- Export/import functionality