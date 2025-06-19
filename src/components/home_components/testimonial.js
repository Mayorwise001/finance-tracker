import React from 'react';
import './styles/testimonials.css'; // Import the styles for the testimonials section

const testimonials = [
  {
    name: 'Kathryn',
    since: 'ETX since 2015',
    highlight: 'I realized that money was a tool that would help me create my dream life.',
    text: 'ETX truly helped me buy freedom from a toxic relationship, the flexibility to spend time with my kids, and the ability to pursue my biggest dreams.',
    image: 'testimonial1.webp',
    color: '#a3e635', // Green
  },
  {
    name: 'Kyle',
    since: 'ETX since 2020',
    highlight: 'I went from living paycheck to paycheck, to having N42K saved in one year.',
    text: 'ETX has removed the stress of money from my life and in doing so has helped make me a better husband. It\'s like I got to remove a personal flaw I had never been able to fix.',
    image: 'testimonial 3.webp',
    color: '#a3e635', // Teal
  },
  {
    name: 'Wave',
    since: 'ETX since 2015',
    highlight: 'I slayed N30K of debt, reclaimed my freedom, and now I’m living wild and free.',
    text: 'I now live a life of empowered spending and am headed for an early retirement, knowing I’ll never have to compromise my values for a paycheck.',
    image: 'testi1.webp',
    color: '#a3e635', // Purple
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-container">
      {testimonials.map((t, index) => (
        <div className="testimonial-card" key={index}>
          <img src="quote-removebg-preview.png" alt="quote" className="quote-icon" />
          <p className="highlight">{t.highlight}</p>
          <p className="text">{t.text}</p>
<div className="user-info">
  <div className="user-image-wrapper">
    <img src={t.image} alt={t.name} className="user-image" />
  </div>
  <div>
    <p className="username">{t.name}</p>
    <p className="since">{t.since}</p>
  </div>
</div>
          <div
            className="card-footer"
            style={{ backgroundColor: t.color }}
          ></div>
          <div className="card-bottom-wave"></div>
        </div>
      ))}
    </section>
  );
};

export default Testimonials;
