import React, { useEffect, useRef, useState} from "react";
import { Link } from 'react-router-dom';
import "./styles/hero.css"; // Import the styles for the hero section

const HeroSection = () => {
  const contentRef = useRef(); // ⬅️ Ref for content
  const imageRef = useRef();   // ⬅️ Ref for image

  const [showContent, setShowContent] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowContent(true);
      },
      { threshold: 0.4 }
    );

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowImage(true);
      },
      { threshold: 0.4 }
    );

    if (contentRef.current) contentObserver.observe(contentRef.current);
    if (imageRef.current) imageObserver.observe(imageRef.current);

    return () => {
      contentObserver.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  return (
    <section className="hero">
      <div
        className={`hero-content fade-left ${showContent ? "fade-in" : ""}`}
        ref={contentRef}
      >
        <h1>How will you spend your money life?</h1>
        <p>Create a friendly, flexible plan and spend it well with ETX.</p>
        <Link to="/login" className="cta-button">
        Start For Free now
      </Link>
        <a href="#pricing" className="buybutton">
          Buy now and save
        </a>
      </div>
      <div
        className={`hero-image scale-in ${showImage ? "show-scale" : ""}`}
        ref={imageRef}
      >
        <img
          src="./hero3-removebg-preview.png"
          alt="Finance App Illustration"
        />
      </div>
    </section>
  );
};

export default HeroSection;
