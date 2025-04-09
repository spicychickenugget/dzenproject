// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from react-dom/client
import App from './App';
import { Buffer } from 'buffer';  // Import Buffer from buffer package

// Make Buffer globally available by assigning it to the window object
window.Buffer = Buffer;

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root using createRoot
root.render(  // Render the app using the root
  <React.StrictMode>
    <App />
  </React.StrictMode>
);