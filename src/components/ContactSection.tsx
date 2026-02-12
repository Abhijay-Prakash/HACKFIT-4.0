import "./Contact.css";

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

          <div className="contact-card person-card">
            <h3 className="person-name">Hisham Haskar</h3>
            <p className="person-role">Chairperson, ACM</p>
            <p className="person-phone">+91 1234567890</p>
          </div>

          <div className="contact-card person-card">
            <h3 className="person-name">Abhijay Prakash</h3>
            <p className="person-role">Chairperson, FHC</p>
            <p className="person-phone">+91 7356252747</p>
          </div>

          <div className="contact-card person-card">
            <h3 className="person-name">Jeevan Biju Korah</h3>
            <p className="person-role">Project Lead, FHC</p>
            <p className="person-phone">+91 9946655199</p>
          </div>

          <div className="contact-card person-card">
            <h3 className="person-name">abcd</h3>
            <p className="person-role">qwertyuiop</p>
            <p className="person-phone">+91 1234567890</p>
          </div>

        </div>

      </div>
    </section>
  );
}
