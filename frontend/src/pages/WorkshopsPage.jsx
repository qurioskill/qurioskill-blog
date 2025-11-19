import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import WorkshopCard from "../components/WorkshopCard.jsx";
import {
  INDIVIDUAL_WORKSHOPS,
  ORGANIZATION_WORKSHOPS,
  INDIVIDUAL_PREVIEW_WORKSHOPS,
  ORGANIZATION_PREVIEW_WORKSHOPS
} from "../data/workshops.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

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
          <Link className="button-link" to={workshop.link}>
            View workshop
          </Link>
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
  usePageMetadata(
    "QurioSkill | Skill Training Workshops for Individuals",
    "Cohort-based Canadian workshops for individuals to build digital and professional skills with guided practice."
  );

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
              <Link className="button-link" to={workshop.link}>
                Register
              </Link>
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
  usePageMetadata(
    `${title} | QurioSkill`,
    `${subtitle} Discover cohort-based digital and professional skill training with QurioSkill.`
  );
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
                  <Link className="button-link" to={workshop.link}>
                    More info
                  </Link>
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
  const digitalGroup = ORGANIZATION_WORKSHOPS.find((group) => group.id === "digital-skills");
  const professionalGroup = ORGANIZATION_WORKSHOPS.find((group) => group.id === "professional-skills");

  return (
    <div className="page workshops-page">
      <header className="hero">
        <p className="eyebrow">For organizations</p>
        <h1>Tailored skill training for your teams.</h1>
        <p className="subtitle">
          Digital and professional skill labs customized to your tools, culture, and strategic moments—built with an exploratory
          phase so we match the skills you actually need.
        </p>
      </header>

      <section className="workshops-overview">
        <div className="workshop-intro">
          <h2>How we start: exploratory phase</h2>
          <ul>
            <li>Discovery interviews with team leads to map roles, tools, and the moments that matter.</li>
            <li>Skill gap snapshot across digital and professional capabilities (automation, AI, facilitation, storytelling).</li>
            <li>Co-designed sprint plan: live labs + async micro-sims, with measurement readouts your leaders can use.</li>
          </ul>
          <div className="cta-actions">
            <a className="button-link" href="mailto:hello@qurioskill.ca">
              Book an exploratory call
            </a>
          </div>
        </div>
      </section>

      <section className="org-tracks horizontal">
        {digitalGroup && (
          <div className="org-track-card">
            <p className="eyebrow">Digital skills</p>
            <h2>{digitalGroup.heading}</h2>
            <p>{digitalGroup.description}</p>
            <ul className="idea-list">
              <li>Prompt engineering for teams</li>
              <li>Automation jumpstarts and co-pilot workflows</li>
              <li>Data storytelling and analytics for stakeholders</li>
              <li>Responsible AI and experimentation guardrails</li>
            </ul>
            <div className="topic-tags">
              {digitalGroup.workshops.flatMap((workshop) => workshop.tags || []).slice(0, 8).map((tag, idx) => (
                <span key={`${tag}-${idx}`} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {professionalGroup && (
          <div className="org-track-card">
            <p className="eyebrow">Professional skills</p>
            <h2>{professionalGroup.heading}</h2>
            <p>{professionalGroup.description}</p>
            <ul className="idea-list">
              <li>Facilitation for hybrid teams</li>
              <li>Structured communication and storytelling</li>
              <li>Coaching conversations and feedback loops</li>
              <li>Decision-making and problem framing</li>
            </ul>
            <div className="topic-tags">
              {professionalGroup.workshops.flatMap((workshop) => workshop.tags || []).slice(0, 8).map((tag, idx) => (
                <span key={`${tag}-${idx}`} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="workshop-cta-panel">
        <div>
          <p className="eyebrow">Ready to explore?</p>
          <h2>Book a call to chat about your org&apos;s needs.</h2>
          <p>We’ll review your current tools, goals, and teams to shape the right digital and professional skill mix.</p>
        </div>
        <div className="cta-actions">
          <a className="button-link" href="mailto:hello@qurioskill.ca">
            Book a call
          </a>
          <Link className="ghost-button" to="/blog">
            See our thinking
          </Link>
        </div>
      </section>
    </div>
  );
}
