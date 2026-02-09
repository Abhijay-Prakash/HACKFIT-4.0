import React from "react";
import "../SectionStyles.css";

interface CyberDividerProps {
  className?: string;
}

const CyberDivider: React.FC<CyberDividerProps> = ({ className = "" }) => {
  return (
    <div className={`cyber-divider ${className}`}>
      <span className="cyber-divider-data left">// SYS.INIT</span>
      <div className="cyber-divider-accent left" />
      <div className="cyber-divider-center" />
      <div className="cyber-divider-accent right" />
      <span className="cyber-divider-data right">HACKFIT.2026</span>
    </div>
  );
};

export default CyberDivider;
