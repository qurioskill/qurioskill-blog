import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

const SCROLL_OFFSET = 90;

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(elementTop - SCROLL_OFFSET, 0),
            behavior: "smooth"
          });
        }
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="site-layout">
      <NavBar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
