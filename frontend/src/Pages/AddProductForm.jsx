// AddProductForm.jsx
import React, { useState } from 'react';
import './CSS/AddProductForm.css'; // Import the CSS file

const AddProductForm = ({ onAddProduct, onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [new_price, setNewPrice] = useState('');
    const [old_price, setOldPrice] = useState('');
    const [category, setCategory] = useState(''); // State for category

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            image,
            new_price: parseFloat(new_price), // Convert price to float
            old_price: parseFloat(old_price), // Convert price to float
            category,
        };
        onAddProduct(newProduct); // Call the function passed from ShopCategory
        if (onClose) onClose(); // Call onClose if it's provided
        // Reset form fields
        setName('');
        setImage('');
        setNewPrice('');
        setOldPrice('');
        setCategory(''); // Reset category
    };

    // Handle image file upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onloadend = () => {
                setImage(reader.result); // Set the image state to the file's data URL
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            {/* Updated image input for file upload */}
            <input
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleImageUpload} // Call handleImageUpload on change
                required
            />
            <input
                type="number"
                placeholder="New Price"
                value={new_price}
                onChange={(e) => setNewPrice(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Old Price"
                value={old_price}
                onChange={(e) => setOldPrice(e.target.value)}
                required
            />
            {/* Dropdown for category selection */}
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
            >
                <option value="" disabled>Select Category</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
            <button type="submit">Add Product</button>
            {/* Optional: Display uploaded image preview with specific size */}
            {image && (
                <div className="image-preview">
                    <h3>Image Preview:</h3>
                    <img 
                        src={image} 
                        alt="Uploaded" 
                    />
                </div>
            )}
        </form>
    );
};

export default AddProductForm;
