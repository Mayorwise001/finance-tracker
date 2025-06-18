import React from 'react';
import Navbar from '../components/home_components/navbar'; // Import your Navbar component
import MainSection from './home_components/main';
import HeroSection from './home_components/hero'; // Import your HeroSection component
import YnabStats from './home_components/no1_section';

function Home() {
 
    return(
        <>
        <Navbar />
        
        {/* MainSection component for the main content */}
        <HeroSection />
        <YnabStats />
        <MainSection />
        </>
    )

    }
        
export default Home;