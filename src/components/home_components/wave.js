// components/WaveBackground.jsx
import React from "react";
import "./styles/wave.css"; // Import the styles for the wave section
// import phoneImg from "../assets/phone.png"; // Replace with your image path

const WaveBackground = () => {
  return (
    <section className="wave-section">
      <svg className="wave-svg" viewBox="0 0 1440 320">
        <path
          fill="#2f55d4"
          fillOpacity="1"
          d="M0,160L1440,32L1440,320L0,320Z"
        ></path>
        <path
          fill="#32d296"
          fillOpacity="0.8"
          d="M0,192L1440,64L1440,320L0,320Z"
        ></path>
      </svg>

      <div className="image-wrapper">
        {/* <img src={phoneImg} alt="Phone UI" className="main-image" />
        <img src="/assets/money1.png" alt="Cash" className="cash cash-1" />
        <img src="/assets/money2.png" alt="Cash" className="cash cash-2" /> */}
      </div>
    </section>
  );
};

export default WaveBackground;
