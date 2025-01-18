import React from 'react';
import Paypal from '../Components/Paypal/Paypal.js';
import './CSS/Transaction.css';  // Optional: Import a custom CSS file for styling
import bg_studying from '../Components/Assets/bg_studying.jpg';

const Transaction = () => {
  return (
    <div className="transaction-bg">
      <div className="transaction-container">
        <h1>Your Donation Means a Lot</h1>
        <p className="message">
          Thank you for choosing to donate! Your generosity will help support educational resources
          and empower students to succeed. Every dollar counts, and your contribution makes a real difference.
          We appreciate your kindness and commitment to making education accessible for all.
        </p>

        <Paypal /> {/* PayPal donation button */}
      </div>
    </div>
  );
};

export default Transaction;
