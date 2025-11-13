import { useEffect, useState } from "react";

export default function WorkshopCard({ workshops = [] }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeModal = () => setSelected(null);

  return (
    <>
      <section className="workshop-card">
        <p className="about-eyebrow">Upcoming Workshops</p>
        <h2>Join a live sprint</h2>
        {workshops.length === 0 ? (
          <p>No live workshops scheduled yet.</p>
        ) : (
          <ul className="workshop-list">
            {workshops.map((workshop) => (
              <li key={workshop.id}>
                <div className="workshop-title">
                  <span>{workshop.title}</span>
                  <span className="price-badge">
                    {workshop.price.toLowerCase() === "free" ? "Free" : workshop.price}
                  </span>
                </div>
                <button type="button" className="text-link more-info" onClick={() => setSelected(workshop)}>
                  More info →
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {selected && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={selected.title} onClick={closeModal}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <p className="modal-eyebrow">Workshop spotlight</p>
            <h3>{selected.title}</h3>
            <p className="modal-price">
              <span className="price-badge large">
                {selected.price.toLowerCase() === "free" ? "Free" : selected.price}
              </span>
            </p>
            <p>{selected.details}</p>
            <div className="modal-actions">
              <a className="button-link" href={selected.link} target="_blank" rel="noreferrer">
                Register now
              </a>
              <button type="button" className="ghost-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
