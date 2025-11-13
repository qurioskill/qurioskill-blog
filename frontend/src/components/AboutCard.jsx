export default function AboutCard({
  title = "About QurioSkill",
  description,
  linkHref = "https://qurioskill.ca",
  linkLabel = "Visit qurioskill.ca"
}) {
  return (
    <section className="about-card">
      <p className="about-eyebrow">About</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <a className="about-link" href={linkHref} target="_blank" rel="noreferrer">
        {linkLabel}
      </a>
    </section>
  );
}
