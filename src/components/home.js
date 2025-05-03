import React from 'react';
import Navbar from '../components/home_components/navbar'; // Import your Navbar component
import MainSection from './home_components/main';

function Home() {
 
    return(
        <>
        <Navbar />
        
        {/* MainSection component for the main content */}
        <MainSection />
        </>
    )

    }
        
export default Home;