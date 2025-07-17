import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Mouse move handler for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  // Create floating particles
  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 3 + 5}s`
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <style jsx>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          overflow-x: hidden;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
        }

        .bg-car {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .bg-car::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.85) 0%,
            rgba(10, 10, 10, 0.65) 30%,
            rgba(10, 10, 10, 0.75) 70%,
            rgba(10, 10, 10, 0.9) 100%
          );
          z-index: 2;
        }

        .car-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.7) contrast(1.1);
        }

        .content {
          position: relative;
          z-index: 3;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 30px;
        }

        .logo {
          font-size: 2.8rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -2px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          align-self: flex-start;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? 0 : 30}px);
          transition: all 0.8s ease;
        }

        .center-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex: 1;
          gap: 50px;
        }

        .headline {
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -3px;
          line-height: 1.1;
          text-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? 0 : 30}px);
          transition: all 0.8s ease 0.2s;
        }

        .continue-button {
          position: relative;
          padding: 20px 60px;
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          overflow: hidden;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? 0 : 30}px);
          transition: all 0.8s ease 0.4s;
        }

        .continue-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .continue-button:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 50px rgba(255, 255, 255, 0.1);
        }

        .continue-button:hover::before {
          left: 100%;
        }

        .continue-button:active {
          transform: translateY(0);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.6;
          animation: pulse 4s ease-in-out infinite;
          transform: translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px));
          transition: transform 0.1s ease-out;
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px)) scale(1); 
          }
          50% { 
            opacity: 0.6; 
            transform: translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px)) scale(1.1); 
          }
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float 8s linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 30px 20px;
          }

          .logo {
            font-size: 2.2rem;
          }

          .headline {
            font-size: 2.5rem;
            letter-spacing: -2px;
          }

          .continue-button {
            padding: 18px 50px;
            font-size: 1.1rem;
          }

          .center-content {
            gap: 40px;
          }
        }

        @media (max-width: 480px) {
          .content {
            padding: 20px 15px;
          }

          .logo {
            font-size: 2rem;
          }

          .headline {
            font-size: 2rem;
            letter-spacing: -1px;
          }

          .continue-button {
            padding: 16px 40px;
            font-size: 1rem;
          }

          .center-content {
            gap: 30px;
          }

          .glow-effect {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

      <div className="">
        {/* Background Car Image */}
        <div className="bg-car">
          <img 
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Car" 
            className="car-image"
          />
        </div>

        {/* Floating Particles */}
        <div className="particles">
          {createParticles()}
        </div>

        {/* Content Layer */}
        <div className="content">
          {/* Logo */}
          <div className="logo">RideNow</div>

          {/* Center Content */}
          <div className="center-content">
            {/* Glow Effect */}
            <div className="glow-effect"></div>
            
            {/* Headline */}
            <h1 className="headline">Get Started with RideNow</h1>
            
            {/* Continue Button */}
            <Link 
              to={'/login'}
              className="continue-button"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;