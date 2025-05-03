import React from 'react';
import './styles/main.css'; // Import the styles

const MainSection = () => {
  return (
    <section className="main-section">
      <div className="text-content">
        <h1>The only app that gets your money into shape</h1>
        <p>Take control of your budget, savings, and financial goals — all in one place.</p>
      </div>
      <div className="image-content">
        <img src="./NewLogo.png" alt="Finance App Illustration" />
      </div>
    </section>
  );
};

export default MainSection;
