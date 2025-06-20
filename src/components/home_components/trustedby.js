import React from 'react';
import './styles/trustedby.css'; // Import the styles for the trusted by section

const companies = [
  { name: 'Applezd', logo: 'image_2.jpg' },
  { name: 'Trustedpilot', logo: 'image_1.png' },
  { name: 'CNBCD', logo: 'image_3.jpg' },
  { name: 'Gugle', logo: 'image_4.jpg' },
  { name: 'Micracraft', logo: 'image_5.jpg' },
  { name: 'Amazonia', logo: 'image_6.webp' },
  // Add more as needed
];

const TrustedBy = () => {
  return (
    <div className="trusted-section">
      <h2 className='trust'>Trusted by:</h2>
      <div className="trusted-logos">
        {companies.map((company, index) => (
          <div className="trusted-logo-item" key={index}>
            <img src={company.logo} alt={company.name} />
            <p>{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
