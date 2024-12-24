import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>JusMe is a comprehensive e-commerce platform that streamlines the process 
                of buying and selling products and services over the internet. Whether 
                you're a business owner looking to expand your reach or a consumer seeking 
                a convenient shopping experience, JusMe offers a user-friendly interface that 
                caters to a wide variety of needs. The platform enables sellers to list their 
                products or services with ease, while providing buyers with a seamless browsing 
                and purchasing experience. With secure payment gateways, diverse product categories, 
                and efficient delivery options, JusMe ensures that both sellers and buyers can engage 
                in transactions with confidence. Additionally, the platform supports customer reviews, 
                detailed product descriptions, and personalized recommendations, enhancing the overall 
                user experience. Whether you're in search of the latest tech gadgets, fashion trends, or 
                specialized services, JusMe serves as a one-stop shop, bridging the gap between businesses 
                and consumers in the ever-evolving digital marketplace.</p>
            </div>
        </div>
    )
}

export default DescriptionBox
