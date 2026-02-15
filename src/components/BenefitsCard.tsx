import React from "react";
import "../SectionStyles.css";

interface BenefitsCardProps {
  items?: string[];
}

const defaultItems = ["GenAI", "Transformation", "Hugging", "Data Science"];

const BenefitsCard: React.FC<BenefitsCardProps> = ({
  items = defaultItems,
}) => {
  return (
    <aside className="benefits-card">
      <div className="benefits-card-inner">
        <div className="benefits-header" aria-hidden>
          <div className="benefits-title">Benefits</div>
          <div className="benefits-tab" />
        </div>

        <div className="benefits-divider" />

        <ul className="benefits-list">
          {items.map((it) => (
            <li key={it} className="benefit-item">
              <span className="benefit-hash">#</span>
              <span className="benefit-text">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BenefitsCard;
