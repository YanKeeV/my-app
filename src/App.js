import './App.css';
import React from 'react';
import { Routes, Route, Link, Router } from 'react-router-dom';
import Resume from './pages/resumePage';
import Portfolio from './pages/portfolioPage';
import Cv from './pages/cvPage';
import Login from './pages/loginPage';
import Administration from './pages/administrationPage';
import NotFoundPage from './pages/notFoundPage';


function App() {
  return (
      <>
        <Routes>
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
}

export default App;
