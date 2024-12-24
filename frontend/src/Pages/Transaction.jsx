import React from 'react';
import PayPal from '../Components/Paypal/PayPal';

const Transaction = () => {
    return (
        <div>
            <PayPal /> {/* Directly rendering PayPal component */}
        </div>
    );
};

export default Transaction;
