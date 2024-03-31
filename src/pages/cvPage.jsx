import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience } from '../store/slices/experienceSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './cvPage.css'

function Cv() {

    return (
        <div className='cvContainer'>
            <Navbar initialTab={"/cv"} />
            <div className='cvBackground'>
                <div className='cvText'>
                    There will be an expanded version of the resume with detailed information on all items here in the future.
                </div>
            </div>
        </div>
    );
};

export default Cv;