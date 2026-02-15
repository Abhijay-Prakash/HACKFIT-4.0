import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA?: any;
    THREE?: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<any>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Wait for scripts to load
    const checkScriptsLoaded = setInterval(() => {
      if (window.VANTA && window.THREE) {
        clearInterval(checkScriptsLoaded);

        if (!vantaEffect.current) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x469d1d,
            backgroundColor: 0x000000,
            points: 20.0,
            maxDistance: 19.0,
            spacing: 16.0,
            showDots: false,
          });
        }
      }
    }, 100);

    return () => {
      clearInterval(checkScriptsLoaded);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="vanta-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
