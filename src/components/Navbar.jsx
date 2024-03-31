import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar({initialTab}) {

    const [activeTab, setActiveTab] = useState('');
    const location = useLocation();

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const initialTab = location.pathname
        setActiveTab(initialTab || '/resume');
    }, [setActiveTab], location.search);

    return (
        <div className='navbarContainer'>
            <Link to={'/resume'} className={activeTab === '/resume' ? 'activeButton' : "button"} onClick={() => handleTabClick("/resume")}>
                Resume
            </Link>
            <Link to={'/cv'} className={activeTab === '/cv' ? 'activeButton' : "button"} onClick={() => handleTabClick("/cv")}>
                CV
            </Link>
            <Link to={'/portfolio'} className={activeTab === '/portfolio' ? 'activeButton' : "button"} onClick={() => handleTabClick("/portfolio")}>
                Portfolio
            </Link>
        </div>
    );
};

export default Navbar;