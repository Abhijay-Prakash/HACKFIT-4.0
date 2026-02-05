import React from "react";
import "./HackathonCards.css";

const HackathonCards = () => {
  const aboutData = {
    title: "About",
    description:
      "ICEFOSS - hackathon\nHackathon is an Retrieval Augmented Generation (RAG) and swiner siverter chatbotics, analys, and enterprise, covers, concepts, assists, and real-word use cases.",
  };

  const tracksData = {
    title: "Tracks",
    items: ["GeAI", "Transformation", "Hugging", "Data Science"],
  };

  const prizesData = {
    title: "Prizes",
    items: [
      { name: "Prize 1", type: "Compiler", amount: "1,200" },
      { name: "Prize 2", type: "Compiler", amount: "399" },
      { name: "Prize 3", type: "Compiler", amount: "299" },
    ],
  };

  return (
    <div className="container">
      {/* About Card */}
      <div className="card-wrapper">
        <div className="card-glow"></div>
        <div className="card">
          <h2 className="card-title">{aboutData.title}</h2>
          <div className="card-underline"></div>
          <p className="card-description">
            {aboutData.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < aboutData.description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <a href="#" className="learn-more">
            Learn More
          </a>
        </div>
      </div>

      {/* Tracks Card */}
      <div className="card-wrapper">
        <div className="card-glow"></div>
        <div className="card">
          <h2 className="card-title">{tracksData.title}</h2>
          <div className="card-underline"></div>
          <div className="track-list">
            {tracksData.items.map((track, index) => (
              <div key={index} className="track-item">
                <span className="track-hash">#</span>
                <span>{track}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prizes Card */}
      <div className="card-wrapper">
        <div className="card-glow"></div>
        <div className="card">
          <h2 className="card-title">{prizesData.title}</h2>
          <div className="card-underline"></div>
          <div className="prize-list">
            {prizesData.items.map((prize, index) => (
              <div key={index} className="prize-item">
                <div className="prize-label">
                  <span className="prize-name">{prize.name}</span>
                  <span className="prize-type">{prize.type}</span>
                </div>
                <div className="prize-amount">
                  <span className="prize-dot"></span>
                  <span>{prize.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonCards;
