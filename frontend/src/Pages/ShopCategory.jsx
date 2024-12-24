import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
    const { all_product, addProduct } = useContext(ShopContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('oldest');
    const itemsPerPage = 9;
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const filteredProducts = all_product.filter(
        (item) => item.category === props.category
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'oldest') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortOrder === 'most_expensive') {
            return b.new_price - a.new_price;
        } else if (sortOrder === 'alphabetical') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Handle navigation to the Add Product page
    const goToAddProductPage = () => {
        navigate('/admin/import'); // Redirect to the AddProductPage
    };

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>
                        Showing {indexOfFirstProduct + 1}- 
                        {Math.min(indexOfLastProduct, sortedProducts.length)}
                    </span>{' '}
                    out of {sortedProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    Sort by 
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)} 
                        className="sort-dropdown" // Add a class for styling
                    >
                        <option value="oldest">Oldest to Newest</option>
                        <option value="most_expensive">Most Expensive to Least Expensive</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                    </select>
                </div>
            </div>

            {/* Button to navigate to the AddProductPage */}
            <button onClick={goToAddProductPage}>
                Add New Product
            </button>

            <div className="shopcategory-products">
                {currentProducts.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>

            <div className="shopcategory-pagination">
                <button
                    onClick={() => setCurrentPage(1)}
                    className={currentPage === 1 ? 'active' : ''}
                    disabled={currentPage === 1}
                >
                    Page 1
                </button>
                <button
                    onClick={() => setCurrentPage(2)}
                    className={currentPage === 2 ? 'active' : ''}
                    disabled={currentPage === 2 || sortedProducts.length <= itemsPerPage}
                >
                    Page 2
                </button>
            </div>
        </div>
    );
};

export default ShopCategory;
