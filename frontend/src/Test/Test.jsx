import React, { useEffect, useState } from 'react';

const Test = () => {
    // State to store the fetched data
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UseEffect to fetch data when the component mounts
    useEffect(() => {
        // You can replace this URL with any API of your choice
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []); // Empty dependency array means it only runs once when the component mounts

    // Conditionally render content based on loading, error, or success
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="">
            <h1>Test Page</h1>
            <h2>Fetched Data:</h2>
            <ul>
                {data && data.map((item) => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test;
