import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { API_BASE } from "../config.js";

const HERO_POINTS = [
  "Micro-simulations tailored to your tools",
  "Blended facilitation for hybrid teams",
  "Measurement baked into every sprint"
];

const ABOUT_PILLARS = [
  {
    title: "Cohort-based fuel",
    copy: "We design every sprint so professionals learn beside peers, share proof-of-work, and keep showing up for one another."
  },
  {
    title: "Practice over presentations",
    copy: "Weekly micro-simulations, async nudges, and live labs mean every module ends with action, not just insights."
  },
  {
    title: "Momentum you can measure",
    copy: "Stories, dashboards, and office-hour recordings help sponsors see adoption without chasing status updates."
  }
];

const TEAM_MEMBERS = [
  {
    name: "Madhav Malhotra",
    title: "Co-founder & Experience Architect",
    bio: "Designs blended learning journeys and keeps our facilitation playbooks crisp.",
    location: "Toronto, Canada"
  },
  {
    name: "Tara Venkatesh",
    title: "Head of Research",
    bio: "Leads the learning science lab and turns experiments into micro-sim libraries.",
    location: "Montreal, Canada"
  },
  {
    name: "Noah Greene",
    title: "Product & Analytics",
    bio: "Builds the dashboards, nudges, and storytelling readouts our partners rely on.",
    location: "Calgary, Canada"
  }
];

const SOLUTIONS = [
  {
    title: "Capability Sprints",
    description:
      "Rapid pathways that turn strategic skill gaps into 4–6 week learning journeys with nudges, practice, and coaching.",
    highlights: ["Sprint architecture", "Manager toolkits", "Live retros"]
  },
  {
    title: "Micro-simulations",
    description:
      "Scenario libraries that let teams practice decisions in under 10 minutes, straight from Slack, Teams, or your LMS.",
    highlights: ["Async practice loops", "Immediate feedback", "Reusable assets"]
  },
  {
    title: "Enablement Analytics",
    description:
      "Story-driven dashboards that show adoption, sentiment, and readouts leaders can act on within one exec meeting.",
    highlights: ["Narrative reporting", "Behavioral signals", "Impact briefs"]
  }
];

const METRICS = [
  { label: "Learner NPS", value: "+71" },
  { label: "Launch speed", value: "3 weeks" },
  { label: "Practice completions", value: "82%" },
  { label: "Cities served", value: "17" }
];

const TESTIMONIALS = [
  {
    quote:
      "QurioSkill helped us translate an ambitious AI strategy into weekly habits the whole org could lean into.",
    author: "Sonia Park",
    role: "VP Digital Adoption · Retail"
  },
  {
    quote:
      "The micro-sims kept our managers practicing between live labs, which meant coaching time was spent deepening, not repeating.",
    author: "Rishi Misra",
    role: "Head of L&D · Fintech"
  },
  {
    quote:
      "Their storytelling dashboards finally gave our exec team a narrative for people development that felt measurable.",
    author: "Camila Ortega",
    role: "Chief People Officer · Healthtech"
  }
];

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_BASE}/api/posts`);
        if (!res.ok) {
          throw new Error("Unable to fetch posts");
        }
        const data = await res.json();
        setRecentPosts(data.slice(0, 3));
      } catch (_err) {
        setRecentPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="landing">
      <section className="landing-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Upskilling studio</p>
          <h1>Modern learning programs that feel handcrafted.</h1>
          <p className="subtitle">
            QurioSkill partners with ambitious teams to design snackable pathways, micro-simulations,
            and live facilitation moments that turn strategy into habit.
          </p>
          <div className="hero-cta">
            <Link className="button-link" to="/#contact">
              Design my sprint
            </Link>
            <Link className="ghost-button" to="/blog">
              Visit the blog
            </Link>
          </div>
          <ul className="hero-points">
            {HERO_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="about-text">
          <p className="eyebrow">About QurioSkill</p>
          <h2>Upskilling for professionals, built around shared cohort rituals.</h2>
          <p>
            QurioSkill started as a response to teams drowning in slide decks and tool launches with no follow through. We
            felt professionals needed calmer spaces to experiment, debrief, and keep each other accountable.
          </p>
          <p>
            Today our studio blends async micro-simulations, live facilitation, and measurement loops so every cohort
            moves in step—no matter the time zone or experience level.
          </p>
        </div>
        <div className="about-pillars">
          {ABOUT_PILLARS.map((pillar) => (
            <article key={pillar.title} className="about-pillar">
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="section">
        <div className="section-header">
          <p className="eyebrow">Solutions</p>
          <h2>Build pathways with purpose.</h2>
          <p>
            From diagnostics to launch, we keep every artifact simple, beautiful, and obsessively learner-centered.
          </p>
        </div>
        <div className="card-grid">
          {SOLUTIONS.map((solution) => (
            <article key={solution.title} className="solution-card">
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <ul>
                {solution.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="metrics-band">
        <div className="metrics-grid">
          {METRICS.map((metric) => (
            <div key={metric.label} className="metric">
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="stories" className="section testimonials">
        <div className="section-header">
          <p className="eyebrow">Stories</p>
          <h2>Teams stay curious with QurioSkill.</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <blockquote key={item.author} className="testimonial">
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="team" className="section team-section">
        <div className="section-header">
          <p className="eyebrow">Team</p>
          <h2>The studio behind QurioSkill.</h2>
          <p>
            We are facilitators, learning scientists, and builders who believe adults learn best when practice, reflection,
            and community show up together.
          </p>
        </div>
        <div className="team-grid">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.name} className="team-card">
              <div>
                <h3>{member.name}</h3>
                <p className="team-title">{member.title}</p>
              </div>
              <p className="team-bio">{member.bio}</p>
              <p className="team-location">{member.location}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
