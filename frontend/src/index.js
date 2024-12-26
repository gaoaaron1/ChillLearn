import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GradeProvider } from './Context/GradeContext'; // Import GradeProvider instead of ShopContext

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GradeProvider>  {/* Wrap the app with GradeProvider */}
    <App />
  </GradeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
