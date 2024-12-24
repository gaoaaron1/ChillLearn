import React, { useRef, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

function PayPal() {
    const paypal = useRef();
    const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);

    // Create the purchase_units based on the cart items
    const createPurchaseUnits = () => {
        const items = all_product
            .filter(product => cartItems[product.id] > 0)
            .map(product => ({
                name: product.name,
                unit_amount: {
                    currency_code: 'CAD', // Adjust currency if needed
                    value: product.new_price,
                },
                quantity: cartItems[product.id],
            }));

        return [{
            description: 'Cart Purchase',
            amount: {
                currency_code: 'CAD', // Adjust currency if needed
                value: getTotalCartAmount(),
                breakdown: {
                    item_total: {
                        currency_code: 'CAD',
                        value: getTotalCartAmount(),
                    },
                },
            },
            items: items,
        }];
    };

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: createPurchaseUnits(),
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                    alert("Transaction completed by " + details.payer.name.given_name)
                    })
                },
                onError: (err) => {
                    console.error(err);
                },
            })
            .render(paypal.current);
    }, [cartItems, all_product, getTotalCartAmount]); // Rerun if cart data changes

    return <div ref={paypal}></div>;
}

export default PayPal;
