import "./Contact.css";
import "../HackathonCards.css";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-header">
          <p className="contact-kicker">REACH OUT</p>
          <h2 className="contact-title hack-text">Contact</h2>
          <p className="contact-desc">
            Questions about HackFit? Get in touch with our coordinators.
          </p>
        </div>

        <div className="contact-grid people-grid">

          <div className="card-wrapper">
            <div className="card-glow" />
            <div className="card">
              <h3 className="card-title">Hisham Haskar</h3>
              <div className="card-underline" />
              <p className="person-role">Chairperson, ACM</p>
              <p className="person-phone">+91 1234567890</p>
            </div>
          </div>

          <div className="card-wrapper">
            <div className="card-glow" />
            <div className="card">
              <h3 className="card-title">Abhijay Prakash</h3>
              <div className="card-underline" />
              <p className="person-role">Chairperson, FHC</p>
              <p className="person-phone">+91 7356252747</p>
            </div>
          </div>

          <div className="card-wrapper">
            <div className="card-glow" />
            <div className="card">
              <h3 className="card-title">Jeevan Biju Korah</h3>
              <div className="card-underline" />
              <p className="person-role">Project Lead, FHC</p>
              <p className="person-phone">+91 9946655199</p>
            </div>
          </div>

          <div className="card-wrapper">
            <div className="card-glow" />
            <div className="card">
              <h3 className="card-title">abcd</h3>
              <div className="card-underline" />
              <p className="person-role">qwertyuiop</p>
              <p className="person-phone">+91 1234567890</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
