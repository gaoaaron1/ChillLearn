import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Add validation or payment logic here
        console.log('Payment Details:', { cardNumber, expiryDate, cvv, cardHolderName });
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal">
                <h2>Enter Payment Details</h2>
                <form onSubmit={handlePaymentSubmit}>
                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                            maxLength="16"
                            pattern="\d{16}"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                            maxLength="3"
                            pattern="\d{3}"
                        />
                    </div>
                    <button type="submit">Pay Now</button>
                    <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
