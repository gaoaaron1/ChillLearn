// ImportProducts.jsx
import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import AddProductForm from './AddProductForm';
import './CSS/ImportProducts.css'; // Import the CSS file

const ImportProducts = () => {
    const { addProduct } = useContext(ShopContext); // Get the addProduct function from context
    const [showForm, setShowForm] = useState(false); // State to show/hide the form

    return (
        <div className="import-products">
            <h1>Import New Product</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Close Form' : 'Add New Product'}
            </button>

            {showForm && (
                <div className="form-container">
                    <AddProductForm 
                        onAddProduct={(newProduct) => {
                            addProduct(newProduct); // Add the new product
                            setShowForm(false); // Close the form after submission
                        }} 
                        onClose={() => setShowForm(false)} // Close the form
                    />
                </div>
            )}
        </div>
    );
};

export default ImportProducts;
