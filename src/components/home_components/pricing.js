import React, { useState, useEffect, useRef } from 'react';
// In a real project, you would import './style.css' here:
import './styles/pricing.css';

// Main Pricing component
const Pricing = () => {
    // Define the data for each pricing plan
    const pricingPlans = [
        {
            name: "Free Trial",
            description: "Get your business off to a strong start",
            currentPrice: "Free",
            saveText: "Free trial for 1 month",
            benefits: [
                "1 user",
                "Maximize tax deductions",
                "Automate transaction matching",
                "Manage, organize, and pay bills",
                "Send pay-enabled invoices"
            ],
            isFavorite: false
        },
        {
            name: "Essentials",
            description: "Organize your books and grow your business",
            originalPrice: "N7500",
            currentPrice: "N6000.00/mo",
            saveText: "Save 90% for 3 months*",
            benefits: [
                "Everything in Simple Start",
                "3 users",
                "Pay and e-1099s",
                "Send recurring invoices"
            ],
            isFavorite: false
        },
        {
            name: "Plus",
            description: "Drive sustainable growth and profitability",
            originalPrice: "N10500",
            currentPrice: "N9000.00/mo",
            saveText: "Save 90% for 3 months*",
            benefits: [
                "Everything in Essentials",
                "5 users",
                "Sell in multiple currencies",
                "Create purchase orders",
                "Keep track of your inventory",
                "Make budgets"
            ],
            isFavorite: true
        },
        {
            name: "Advanced",
            description: "Unlock insights and boost efficiency",
            originalPrice: "N24500",
            currentPrice: "N23000.00/mo",
            saveText: "Save 90% for 3 months*",
            benefits: [
                "Everything in Plus",
                "25 users",
                "Build custom reports",
                "Automate workflows",
                "Sync data with Excel",
                "Create forecasts",
                "Back up your data automatically",
                "Auto-track fixed asset values"
            ],
            isFavorite: false
        }
    ];

    return (
        // The main container and layout classes now refer to custom CSS
        <>
        <div id="pricing">

        </div>
        <div className="bg-gray-50 flex justify-center items-center min-h-screen p-5" >
                 <h2  className="pricing-title">Pricing</h2>
            <div className="container">
                <div className="grid-layout">
                    {/* Map through the pricing plans to render each card */}
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

// New PricingCard component to encapsulate the animation logic
const PricingCard = ({ plan }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            // Adjust threshold as needed, 0.3 means 30% of the element is visible
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup observer on component unmount
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div
            ref={ref}
            className={`
                price-card
                ${plan.isFavorite ? 'favorite' : ''}
                slide-in-left-init
                ${isVisible ? 'slide-in-left-active' : ''}
            `}
        >
            {plan.isFavorite && (
                <span className="badge">
                    PLUS CUSTOMER FAVORITE
                </span>
            )}
            <h3 className="plan-name">
                {plan.name}
            </h3>
            <p className="plan-description">
                {plan.description}
            </p>
            <div className="price-display">
                <span className="original-price">
                    {plan.originalPrice}
                </span>
                {plan.currentPrice}
            </div>
            <p className="save-text">
                {plan.saveText}
            </p>
            <a
                href="https://paystack.com/pay/mayorwisesub"
                className="choose-plan-button"
            >
                Choose Plan
            </a>
            <h4 className="benefits-heading">
                Top benefits
            </h4>
            <ul className="benefits-list">
                {plan.benefits.map((benefit, bIndex) => (
                    <li key={bIndex}>
                        {/* SVG Checkmark Icon */}
                        <svg
                            className="check-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        {benefit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pricing;
