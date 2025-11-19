import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Team", href: "/#team" },
  { label: "Stories", href: "/#stories" },
  { label: "For individuals", href: "/workshops/individuals" },
  { label: "For organizations", href: "/workshops/organizations" },
  { label: "Blog", href: "/blog" }
];

export default function NavBar() {
  return (
    <header className="site-nav">
      <Link className="brand-mark" to="/">
        <img className="brand-logo" src={Logo} alt="QurioSkill logo" />
        <span className="brand-text">QurioSkill</span>
      </Link>
      <nav className="nav-links">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} to={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
