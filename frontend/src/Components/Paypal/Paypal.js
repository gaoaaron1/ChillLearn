import React, { useEffect } from 'react';
import './Paypal.css';  // Import the CSS file for styling

const Paypal = () => {
  useEffect(() => {
    // Dynamically load the PayPal script
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
                  value: '2.00', // Example donation amount
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
  }, []);

  return (
    <div className="paypal-container">
      <h2>Your donation means a lot!</h2>
      <p>By donating $2, you're helping support educational resources.</p>
      <div id="paypal-button-container"></div> {/* PayPal button container */}
    </div>
  );
};

export default Paypal;
