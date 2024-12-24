import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import Transaction from '../../Pages/Transaction';

const CartItems = () => {
    
    //================ Use States ======================//
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);

    //================ Event Handlers ======================//
    const handleQuantityChange = (e, id) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            updateCartItemQuantity(id, value);
        }
    };

    // Function to handle the checkout process
    const handleCheckout = () => {
        const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);
        if (hasItemsInCart) {
            setShowModal(true); // Show checkout modal if items are in the cart
        } else {
            setShowEmptyCartModal(true); // Show empty cart alert if no items in cart
        }
    };



    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <input 
                                    className='cartitems-quantity'
                                    type="number"
                                    value={cartItems[e.id]}
                                    onChange={(event) => handleQuantityChange(event, e.id)}
                                    min="0"
                                />
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img 
                                    className='cartitems-remove-icon' 
                                    src={remove_icon} 
                                    onClick={() => { removeFromCart(e.id) }} 
                                    alt="Remove Icon" 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            {/* Modal for Transaction */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
                        <Transaction /> {/* Transaction component inside modal */}
                    </div>
                </div>
            )}


            {/* Empty Cart Alert Modal */}
            {showEmptyCartModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setShowEmptyCartModal(false)}>X</button>
                        <p>Your cart is empty. Add at least one item to proceed to checkout.</p>
                    </div>
                </div>
            )}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
