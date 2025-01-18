import React, { useState, useEffect } from 'react';
import './Paypal.css';  // Import the CSS file for styling

const Paypal = () => {
  const [donationAmount, setDonationAmount] = useState('2.00'); // Default to $2.00
  const [showModal, setShowModal] = useState(false); // To toggle the PayPal modal visibility
  const [showErrorModal, setShowErrorModal] = useState(false); // To toggle the error modal visibility

  useEffect(() => {
    // Dynamically load the PayPal script only when needed
    if (showModal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=CAD`; // Fetch client ID from .env
      script.async = true;
      script.onload = () => {
        // Ensure the PayPal script is loaded before rendering the button
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: donationAmount, // Use the dynamic donation amount
                  },
                }],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert('Donation successful, thank you!');
                console.log(details);
              });
            },
            onError: (err) => {
              alert('Something went wrong with the donation. Please try again.');
              console.log(err);
            },
          }).render('#paypal-button-container'); // This will render the button in the specified div
        }
      };
      document.body.appendChild(script);
      // Cleanup the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showModal, donationAmount]); // Run when the modal visibility or donation amount changes

  const handleDonationAmountChange = (event) => {
    const value = event.target.value;
    // If the input is empty, set it to '0.00'
    if (value === '' || value === null) {
      setDonationAmount('0.00');
    } else {
      // Otherwise, update the donation amount with the user's input
      setDonationAmount(value);
    }
  };

  const handleDonateClick = () => {
    // Check if the donation is below $1
    if (parseFloat(donationAmount) < 1) {
      setShowErrorModal(true); // Show the error modal if the donation is below $1
    } else {
      setShowModal(true); // Show the PayPal modal if the donation is valid
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the PayPal modal
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false); // Close the error modal
  };

  useEffect(() => {
    if (showModal || showErrorModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal, showErrorModal]);

  return (
    <div className="paypal-container">
      <h2>Your donation means a lot!</h2>
      <p>By donating, you're helping support educational resources.</p>
      <div>
        <label htmlFor="donationAmount">Enter your donation amount (CAD): </label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleDonationAmountChange}
          min="1"
          step="0.01"
        />
      </div>
      <button onClick={handleDonateClick} className="donate-button">Donate</button>

      {/* PayPal Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}></button>
            <div id="paypal-button-container"></div> {/* PayPal button container */}
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseErrorModal}></button>
            <h3>Donation Amount Must Be $1.00 or More</h3>
            <p>Please enter a valid donation amount.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paypal;
