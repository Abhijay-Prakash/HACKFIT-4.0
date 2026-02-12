import React, { useState, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing System...");
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  const images = [logo1, logo2, logo3];

  const loadingMessages = [
    "Initializing Cybernetic Interface...",
    "Loading Neural Networks...",
    "Synchronizing Data Streams...",
    "Loading UnicornStudio SDK...",
    "Establishing WebGL Connection...",
    "Loading 3D Background Scene...",
    "Calibrating Visual Assets...",
    "System Ready...",
  ];

  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 2000; // Minimum 2 seconds for UX

    // Preload fonts
    const preloadFonts = async () => {
      const fonts = [
        new FontFace(
          "Orbitron",
          "url(https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.woff2)",
          {
            weight: "400",
            style: "normal",
          },
        ),
        new FontFace(
          "Orbitron",
          "url(https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKy-xpmIyXjU1pg.woff2)",
          {
            weight: "700",
            style: "normal",
          },
        ),
        new FontFace(
          "Orbitron",
          "url(https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGS-xpmIyXjU1pg.woff2)",
          {
            weight: "900",
            style: "normal",
          },
        ),
      ];

      try {
        const loadedFonts = await Promise.all(fonts.map((font) => font.load()));
        loadedFonts.forEach((font) => document.fonts.add(font));
      } catch (error) {
        console.warn("Font preloading failed:", error);
      }
    };

    // Preload images
    const preloadImages = () => {
      return Promise.all(
        images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Don't block on image errors
            img.src = src;
          });
        }),
      );
    };

    // Load all resources
    Promise.all([preloadFonts(), preloadImages()])
      .then(() => {
        setResourcesLoaded(true);
      })
      .catch((error) => {
        console.warn("Resource preloading error:", error);
        setResourcesLoaded(true); // Continue anyway
      });

    // Simulate loading progress with status updates
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }

        const newProgress = prev + Math.random() * 10;
        const progressStep = Math.floor(newProgress / 12.5); // 8 steps for 8 messages
        if (progressStep < loadingMessages.length) {
          setLoadingStatus(loadingMessages[progressStep]);
        }

        return Math.min(newProgress, 100);
      });
    }, 250);

    // Image rotation
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 800);

    // Random glitch activation
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      },
      1500 + Math.random() * 2500,
    );

    return () => {
      clearInterval(progressInterval);
      clearInterval(imageInterval);
      clearInterval(glitchInterval);
    };
  }, [images.length, loadingMessages]);

  // Complete loading when both resources are loaded and minimum time has passed
  useEffect(() => {
    if (resourcesLoaded && loadingProgress >= 100) {
      setLoadingStatus("System Ready...");
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded, loadingProgress, onLoadComplete]);

  return (
    <div className="loading-screen">
      <div className="noise-overlay" />
      <div className="scan-lines" />

      <div className="loading-content">
        <div
          className={`logo-container ${glitchActive ? "glitch-active" : ""}`}
        >
          <img
            src={images[currentImageIndex]}
            alt="Loading"
            className="loading-logo"
          />
          <div className="glitch-layer-1">
            <img
              src={images[currentImageIndex]}
              alt=""
              className="loading-logo"
            />
          </div>
          <div className="glitch-layer-2">
            <img
              src={images[currentImageIndex]}
              alt=""
              className="loading-logo"
            />
          </div>
        </div>

        <div className="loading-text">
          <div className="loading-title">
            <span className="glitch-text" data-text="HACKFIT 2026">
              HACKFIT 2026
            </span>
          </div>
          <div className="loading-subtitle">{loadingStatus}</div>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${loadingProgress}%` }}
            />
            <div className="progress-glitch" />
          </div>
          <div className="progress-text">
            {Math.floor(loadingProgress)}% LOADED
          </div>
        </div>

        <div className="loading-dots">
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>

      <div className="corner-brackets">
        <div className="bracket top-left" />
        <div className="bracket top-right" />
        <div className="bracket bottom-left" />
        <div className="bracket bottom-right" />
      </div>
    </div>
  );
};

export default LoadingScreen;
