export default function TagFilter({ tags, activeTag, onChange }) {
  return (
    <div className="pill-row">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`pill ${activeTag === tag ? "active" : ""}`}
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
