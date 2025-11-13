import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="post">
      <p className="post-meta">
        <span>{post.read_time}</span>
        <span>·</span>
        <span>{post.author}</span>
      </p>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag.replace(/\s+/g, "").toLowerCase()}
          </span>
        ))}
      </div>
      <Link className="text-link" to={`/posts/${post.slug}`}>
        Read
      </Link>
    </article>
  );
}
