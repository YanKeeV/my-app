import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResumePageContent from '../components/ResumePageContent';

function Resume() {

    return (
        <div>
            <Navbar initialTab={"/resume"} />
            <ResumePageContent />
            <Footer />
        </div>
    );
};

export default Resume;
