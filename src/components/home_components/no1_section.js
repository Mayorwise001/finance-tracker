// 
import React, { useEffect, useRef, useState } from 'react';
import './styles/no1_section.css';

const statsData = [
  {
    percent: '90',
    description: 'say their finances are in a better place since starting ETX*',
  },
  {
    percent: '91',
    description: 'say ETX has changed the way they think about money*',
  },
  {
    percent: '70',
    description: 'of ETXers could live for 3 months or more on savings*',
  },
  {
    percent: '93',
    description: 'have recommended ETX to friends or family*',
  },
];

function StatCard({ percent, description }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const hasAnimated = useRef(false);
  const [isVisible, setIsVisible] = useState(false); // ⬅️ New state for animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
               if (entry.isIntersecting) {
          setIsVisible(true); // ⬅️ Trigger slide-up class

          if (!hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = parseInt(percent, 10);
            const duration = 1000;
            const step = Math.ceil(duration / end);

            const counter = setInterval(() => {
              start += 1;
              setCount(start);
              if (start >= end) clearInterval(counter);
            }, step);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div
      className={`stat-card off-bottom ${isVisible ? 'slide-up' : ''}`} // ⬅️ Conditional animation class
      ref={ref}
    >
      <h2 className="stat-percent">{count}%</h2>
      <p className="stat-description">{description}</p>
    </div>
  );
}

function ETXStats() {
    const headingRef = useRef();
      const subRef = useRef();
  const paragraphRef = useRef();
  const buttonRef = useRef();               // ⬅️ Ref to detect heading visibility

  const [showHeading, setShowHeading] = useState(false); // ⬅️ State to trigger animation
  const [showSub, setShowSub] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButton, setShowButton] = useState(false);

      useEffect(() => {
    const createObserver = (ref, setVisible) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const headingObserver = createObserver(headingRef, setShowHeading);
    const subObserver = createObserver(subRef, setShowSub);
    const paraObserver = createObserver(paragraphRef, setShowParagraph);
    const btnObserver = createObserver(buttonRef, setShowButton);

    return () => {
      headingObserver.disconnect();
      subObserver.disconnect();
      paraObserver.disconnect();
      btnObserver.disconnect();
    };
  }, []);
  
  return (
    <section className="ETX-section">
      <div className="ETX-content">
        {/* Left column */}
        <div className="ETX-left">

           {/* ⬇️ Added animation classes and ref to heading */}
          <h1
            className={`ETX-heading off-left ${showHeading ? 'slide-in' : 'off-left'}`} // ⬅️ Conditional class
            ref={headingRef} // ⬅️ Attach ref
          >
            We’re #1 for a reason…
          </h1>

          
          {/* Subtitle */}
  <p
    ref={subRef}
    className={`ETX-sub off-left ${showSub ? 'slide-in' : ''}`}
  >
    (and not just because our mom said so.)
  </p>

  {/* Paragraph */}
  <p
    ref={paragraphRef}
    className={`ETX-paragraph off-left ${showParagraph ? 'slide-in' : ''}`}
  >
    The ETX Method simplifies spending decisions, clarifies priorities,
    and brings more joy to every day and every dollar. And it’s easy!
    Just give every dollar a job.
  </p>

  {/* CTA Button */}
  <button
    ref={buttonRef}
    className={`ETX-button off-left ${showButton ? 'slide-in' : ''}`}
  >
    Learn More About the ETX Method
  </button>
</div>

        {/* Right column */}
        <div className="ETX-right">
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ETXStats;
