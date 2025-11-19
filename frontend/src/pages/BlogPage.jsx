import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import TagFilter from "../components/TagFilter.jsx";
import { API_BASE } from "../config.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  usePageMetadata(
    "QurioSkill Blog | Digital & Professional Skills Stories",
    "Insights, stories, and mini learnings on digital, professional, and leadership skills from the QurioSkill team."
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postsRes, tagsRes] = await Promise.all([
          fetch(`${API_BASE}/api/posts?include=markdown`),
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
    const activeTagLower = activeTag.toLowerCase();
    const tokens = searchQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return posts.filter((post) => {
      const matchesTag =
        activeTag === "All" ||
        post.tags.some((tag) => tag.toLowerCase() === activeTagLower);
      if (!matchesTag) return false;
      if (tokens.length === 0) return true;

      const searchableText = [
        post.title,
        post.excerpt,
        post.author,
        post.slug,
        post.read_time,
        post.tags.join(" "),
        post.markdown
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return tokens.every((token) => searchableText.includes(token));
    });
  }, [activeTag, posts, searchQuery]);

  return (
    <div className="page page-wide">
      <main className="main-content">
        <header className="hero">
          <h1>QurioSkill Blog</h1>
          <p className="subtitle">
            A curated feed of mini learnings related to digital and professional skills.
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
            <div className="search-bar">
              <label htmlFor="post-search">Search posts</label>
              <input
                id="post-search"
                type="search"
                className="search-input"
                placeholder="Search by title, tag, slug, or text..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <section className="grid">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </section>
            {filteredPosts.length === 0 && (
              <div className="notice">
                No posts match this combination of tag and search terms.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
