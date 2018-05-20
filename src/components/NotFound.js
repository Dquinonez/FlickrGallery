import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import Image from './obi.jpg';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <img src={Image} alt="not found" />
            <br />
            <Link to="/" className="not-found-link">Return to Home Page</Link>
        </div>
    );
}

export default NotFound;