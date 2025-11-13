import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import WorkshopCard from "../components/WorkshopCard.jsx";
import {
  INDIVIDUAL_WORKSHOPS,
  ORGANIZATION_WORKSHOPS,
  INDIVIDUAL_PREVIEW_WORKSHOPS,
  ORGANIZATION_PREVIEW_WORKSHOPS
} from "../data/workshops.js";

function flattenIndividualWorkshops() {
  return INDIVIDUAL_WORKSHOPS.flatMap((group) =>
    group.workshops.map((workshop) => ({
      ...workshop,
      groupTitle: group.title
    }))
  );
}

function IndividualWorkshopModal({ workshop, onClose }) {
  if (!workshop) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={workshop.title} onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details">
          ×
        </button>
        <p className="modal-eyebrow">{workshop.groupTitle}</p>
        <h3>{workshop.title}</h3>
        <p className="modal-price">
          <span className="price-badge large">{workshop.price}</span> · {workshop.level} · {workshop.duration}
        </p>
        <p>{workshop.details}</p>
        <ul>
          {workshop.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
        <div className="modal-actions">
          <a className="button-link" href={workshop.link} target="_blank" rel="noreferrer">
            Register now
          </a>
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function IndividualWorkshopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const allWorkshops = useMemo(() => flattenIndividualWorkshops(), []);

  const tags = useMemo(() => {
    const set = new Set();
    allWorkshops.forEach((workshop) => {
      workshop.tags?.forEach((tag) => set.add(tag));
    });
    return ["All", ...Array.from(set).sort()];
  }, [allWorkshops]);

  const filteredWorkshops = useMemo(() => {
    const tokens = searchQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return allWorkshops.filter((workshop) => {
      const matchesTag =
        activeTag === "All" || (workshop.tags && workshop.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase()));
      if (!matchesTag) return false;
      if (tokens.length === 0) return true;

      const searchableText = [
        workshop.title,
        workshop.goal,
        workshop.details,
        workshop.groupTitle,
        workshop.outcomes?.join(" "),
        workshop.tags?.join(" ")
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return tokens.every((token) => searchableText.includes(token));
    });
  }, [activeTag, allWorkshops, searchQuery]);

  return (
    <div className="page workshops-page">
      <header className="hero">
        <p className="eyebrow">For individuals</p>
        <h1>Grow your skills with cozy, high-accountability cohorts.</h1>
        <p className="subtitle">
          Find a workshop outline that matches your goals, skim the outcomes, and drop into practice loops with live guidance.
        </p>
      </header>

      <section className="workshop-filters">
        <div className="search-bar">
          <label htmlFor="workshop-search">Search workshops</label>
          <input
            id="workshop-search"
            type="search"
            className="search-input"
            placeholder="Search by title, goal, or skill..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="pill-row">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`pill ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="individual-workshop-grid">
        {filteredWorkshops.map((workshop) => (
          <article key={workshop.id} className="individual-workshop-card">
            <div className="workshop-meta">
              <span>{workshop.groupTitle}</span>
              <span>·</span>
              <span>{workshop.level}</span>
              <span>·</span>
              <span>{workshop.duration}</span>
            </div>
            <h2>{workshop.title}</h2>
            {workshop.goal && <p className="workshop-goal">{workshop.goal}</p>}
            <div className="tag-row">
              {workshop.tags?.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="workshop-actions">
              <button type="button" className="ghost-button" onClick={() => setSelectedWorkshop(workshop)}>
                More detail
              </button>
              <a className="button-link" href={workshop.link} target="_blank" rel="noreferrer">
                Register
              </a>
            </div>
          </article>
        ))}
        {filteredWorkshops.length === 0 && (
          <div className="notice">No workshops match that combination yet. Try another search or tag.</div>
        )}
      </section>

      <IndividualWorkshopModal workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} />
    </div>
  );
}

function WorkshopsPageTemplate({
  eyebrow,
  title,
  subtitle,
  expectations,
  groups,
  previewWorkshops,
  ctaHeading
}) {
  return (
    <div className="page workshops-page">
      <header className="hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </header>

      <section className="workshops-overview">
        <div className="workshop-intro">
          <h2>What you can expect</h2>
          <ul>
            {expectations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="workshop-intro-card">
          <WorkshopCard workshops={previewWorkshops.slice(0, 3)} />
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.id} className="workshop-group">
          <div className="group-header">
            <p className="eyebrow">{group.title}</p>
            <h2>{group.heading}</h2>
            <p>{group.description}</p>
          </div>
          <div className="workshop-grid">
            {group.workshops.map((workshop) => (
              <article key={workshop.id} className="workshop-detail-card">
                <div className="workshop-meta">
                  <span>{workshop.level}</span>
                  <span>·</span>
                  <span>{workshop.duration}</span>
                </div>
                <h3>{workshop.title}</h3>
                <p>{workshop.details}</p>
                <ul>
                  {workshop.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <div className="workshop-actions">
                  <span className="price-badge large">{workshop.price}</span>
                  <a className="button-link" href={workshop.link} target="_blank" rel="noreferrer">
                    More info
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="workshop-cta-panel">
        <div>
          <p className="eyebrow">Need a custom lab?</p>
          <h2>{ctaHeading}</h2>
          <p>
            Tell us about the skills you need to unlock and we&apos;ll propose a sprint that combines async practice,
            facilitation, and analytics in under a week.
          </p>
        </div>
        <div className="cta-actions">
          <a className="button-link" href="mailto:hello@qurioskill.ca">
            Talk to the studio
          </a>
          <Link className="ghost-button" to="/blog">
            See our thinking
          </Link>
        </div>
      </section>
    </div>
  );
}

export function OrganizationWorkshopsPage() {
  return (
    <WorkshopsPageTemplate
      eyebrow="For organizations"
      title="Tailored skill training for your teams."
      subtitle="Digital and professional skill labs customized to your tools, culture, and strategic moments."
      expectations={[
        "Discovery sessions to shape digital + professional skill journeys that match your org’s road map.",
        "Live facilitation paired with async simulations that meet employees inside Slack, Teams, or your LMS.",
        "Measurement readouts, playbooks, and office hours tailored to your leaders’ decision cycles."
      ]}
      groups={ORGANIZATION_WORKSHOPS}
      previewWorkshops={ORGANIZATION_PREVIEW_WORKSHOPS}
      ctaHeading="Let’s tailor a sprint to your teams’ needs."
    />
  );
}
