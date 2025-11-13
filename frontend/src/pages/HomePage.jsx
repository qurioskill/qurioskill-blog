import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import TagFilter from "../components/TagFilter.jsx";
import { API_BASE } from "../config.js";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postsRes, tagsRes] = await Promise.all([
          fetch(`${API_BASE}/api/posts`),
          fetch(`${API_BASE}/api/tags`)
        ]);
        if (!postsRes.ok || !tagsRes.ok) {
          throw new Error("Unable to load blog content.");
        }
        setPosts(await postsRes.json());
        setTags(["All", ...(await tagsRes.json())]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
    );
  }, [activeTag, posts]);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">QurioSkill Insights</p>
        <h1>Learning Labs for Teams Who Need Momentum</h1>
        <p className="subtitle">
          A curated feed of frameworks, facilitation tips, and simulation ideas
          from the QurioSkill coaching desk.
        </p>
      </header>

      {error && <div className="notice error">{error}</div>}
      {loading && <div className="notice">Loading stories...</div>}

      {!loading && !error && (
        <>
          <TagFilter
            tags={tags}
            activeTag={activeTag}
            onChange={setActiveTag}
          />
          <section className="grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
          {filteredPosts.length === 0 && (
            <div className="notice">No posts yet for this tag.</div>
          )}
        </>
      )}
    </div>
  );
}
