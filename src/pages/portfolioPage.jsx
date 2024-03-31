import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PortfolioPageContent from '../components/portfolioPageComponents/PortfolioPageContent';
import './portfolioPage.css'

const Portfolio = () => {

    return (
        <div className='portfolioWrapper'>
            <Navbar initialTab={"/portfolio"} />
            <PortfolioPageContent />
            <Footer />
        </div>
    );
};

export default Portfolio;