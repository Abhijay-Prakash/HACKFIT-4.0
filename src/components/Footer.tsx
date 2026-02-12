import "./Footer.css";

export default function Footer() {
  return (
    <footer className="hackfit-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <h3 className="hack-text">HACKFIT 4.0</h3>
          <p>
            A high-energy hackathon focused on innovation, cutting-edge technology and real-world impact.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navigate</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#schedule">Schedule</a>
          <a href="#prizes">Prizes</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-links">
          <h4>Connect</h4>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 HACKFIT 4.0</span>
        <span className="footer-signal">
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
