import React from "react";
import "./HackathonCards.css";

const HackathonCards = () => {
  const aboutData = {
    title: "About",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis quos autem optio voluptatibus aspernatur eos odio porro esse ea ipsam, illum vero quaerat, inventore possimus modi cum! Architecto, provident vero!.",
  };

  const tracksData = {
    title: "Tracks",
    items: ["GeAI", "Transformation", "Hugging", "Data Science"],
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

    </div>
  );
};

export default HackathonCards;
