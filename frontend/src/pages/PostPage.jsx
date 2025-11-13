import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import AboutCard from "../components/AboutCard.jsx";
import WorkshopCard from "../components/WorkshopCard.jsx";
import { WORKSHOPS } from "../data/workshops.js";
import { API_BASE } from "../config.js";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/posts/${slug}`);
        if (!res.ok) {
          throw new Error("That story is not available.");
        }
        const data = await res.json();
        setPost(data.post);
        setContent(DOMPurify.sanitize(marked.parse(data.markdown)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  return (
    <div className="page page-with-sidebar article-page">
      <aside className="sidebar">
        <div className="sidebar-stack">
          <AboutCard
            description="QurioSkill helps individuals and organizations in their journey to upskill and reskill for the digital age."
          />
          <WorkshopCard workshops={WORKSHOPS} />
        </div>
      </aside>
      <main className="main-content">
        <Link className="text-link back-link" to="/">
          ← Back to all posts
        </Link>
        {loading && <div className="notice">Loading the story...</div>}
        {error && <div className="notice error">{error}</div>}
        {!loading && !error && post && (
          <article>
            <header className="article-header">
              <p className="article-meta">
                <span>{post.read_time}</span>
                <span>·</span>
                <span>{post.author}</span>
              </p>
              <h1>{post.title}</h1>
              <div className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag.replace(/\s+/g, "").toLowerCase()}
                  </span>
                ))}
              </div>
            </header>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        )}
      </main>
    </div>
  );
}
