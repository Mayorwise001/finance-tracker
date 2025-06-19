import React from 'react';
import Navbar from '../components/home_components/navbar'; // Import your Navbar component
import MainSection from './home_components/main';
import HeroSection from './home_components/hero'; // Import your HeroSection component
import YnabStats from './home_components/no1_section';
import TrustedBy from './home_components/trustedby'; // Import your TrustedBy component
import Testimonials from './home_components/testimonial';

function Home() {
 
    return(
        <>
        <Navbar />
        
        {/* MainSection component for the main content */}
        <HeroSection />
        <YnabStats />
        <TrustedBy />
        <Testimonials/>
        <MainSection />
        </>
    )

    }
        
export default Home;