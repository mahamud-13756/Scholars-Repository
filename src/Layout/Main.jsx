import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import NavBar from '../pages/shared/NavBar/NavBar';
import backgroundImage from './bfg1.jpg'; // Import the background image

const Main = () => {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
