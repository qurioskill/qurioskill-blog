import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="eyebrow">QurioSkill</p>
        <p className="footer-copy">
          Snackable learning journeys for digital, professional, and leadership skills.
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <p className="footer-heading">Explore</p>
          <ul>
            <li>
              <Link to="/#about">About</Link>
            </li>
            <li>
              <Link to="/#team">Team</Link>
            </li>
            <li>
              <Link to="/workshops/individuals">For individuals</Link>
            </li>
            <li>
              <Link to="/workshops/organizations">For organizations</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-heading">Resources</p>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <a href="https://qurioskill.ca" target="_blank" rel="noreferrer">
                Main site
              </a>
            </li>
            <li>
              <a href="mailto:hello@qurioskill.ca">hello@qurioskill.ca</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-fine">© {year} QurioSkill · Built with intent in Canada.</p>
    </footer>
  );
}
