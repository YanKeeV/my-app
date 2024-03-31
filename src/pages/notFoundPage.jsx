import React from 'react';
import Navbar from '../components/Navbar';
import './notFoundPage.css'

const NotFoundPage = () => {

    return (
        <div className='notFoundContainer'>
            <Navbar />
            <div className='notFoundBackground'>
                <div className='notFoundText'>404 not found</div>
            </div>
        </div>
    );
};

export default NotFoundPage;