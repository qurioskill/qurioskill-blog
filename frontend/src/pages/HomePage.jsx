import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { API_BASE } from "../config.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

const HERO_POINTS = [
  "Live, hands-on workshops for real-world skills you can use immediately",
  "Designed for busy learners with short, practical sessions that fit any schedules",
  "Problem centered learning approach, where learners solve problems while practicing the skills they are learning"
];

const ABOUT_PILLARS = [
  {
    title: "Cohort Based Learning",
    copy: "Engage in live sessions in a cohort-based environment that fosters collaboration and accountability."
  },
  {
    title: "Problem Focused Practice",
    copy: "Learn by solving real problems with guided support that builds practical, job-ready skills."
  },
  {
    title: "Affordable",
    copy: "We are built on a belief that skill-building should be accessible, not expensive."
  },
    {
    title: "Contextualized Learning",
    copy: "Learn through sessions tailored to the needs of each learner and organization, ensuring relevance, clarity, and real-world fit."
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
    title: "Digital Skills for a Changing Workforce",
    description:
      "Equip yourself or your team with the technical confidence needed in a modern, tech-driven workplace.",
    highlights: ["Programming Fundamentals", "Applied AI & Automation", "Digital Tools Proficiency", "Web & Technical Foundations"]
  },
  {
    title: "Professional Skills for High-Performance Work",
    description:
      "Strengthen the human skills that every role depends on—critical thinking, communication, problem-solving, and more..",
    highlights: ["Critical Thinking & Analytical Reasoning", "Structured Communication & Writing", "Collaboration & Inquiry-Based Learning", "Decision-Making & Problem Framing"]
  }
];

const METRICS = [
  { label: "Learners Served", value: "500+" },
  { label: "Average Rating", value: "4.8/5" },
  { label: "Countries Served", value: "5+" },
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
  usePageMetadata(
    "QurioSkill | Canadian Skill Training in Digital & Professional Skills",
    "Cohort-based Canadian workshops that build digital and professional skills for individuals and organizations."
  );

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
          <p className="eyebrow">Skill Learning Studio</p>
          <h1>Modern Live Skill Learning Workshops </h1>
          <p className="subtitle">
            QurioSkill focuses on providing cohort-based upskilling programs for building digital and professional skills in individuals and organizations.
          </p>
          <div className="hero-cta">
            <Link className="button-link" to="/workshops/individuals">
              For Individuals
            </Link>
            <Link className="button-link" to="/workshops/organizations">
              For Organizations
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
          <h2>Upskilling for professionals through live, cohort-based learning and real-world problem-solving.</h2>
          <p>
            QurioSkill began as a way to give organizations and individuals a more human learning experience—live, cohort-based, and built around real problem-solving.
          </p>
          <p>
            Our live cohorts are built around paying attention to each individual, understanding what works for them, and supporting their growth with challenging, meaningful problems.
          </p>
          <p>
Everything we do is grounded in inclusion, empathy, and the belief that learning should feel human.
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
          <h2>Digital and Professional Skills.</h2>
          <p>
            QurioSkill delivers high-impact, cohort-based learning experiences designed for today’s fast-changing work environment.
          </p>
        </div>
        <br></br>
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
