import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './RepositoryApp.jsx';

// Since this project uses only Tailwind classes (via CDN in index.html) 
// and no separate CSS files, we can directly render the main component.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
