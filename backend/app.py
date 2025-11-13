from __future__ import annotations

from dataclasses import asdict, dataclass
import os
from pathlib import Path
from typing import Dict, List, Optional

from flask import Flask, abort, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(
    __name__,
    static_folder=str(Path(__file__).resolve().parent.parent / "frontend" / "dist"),
    static_url_path="/",
)

_allowed_origins_env = os.environ.get("BLOG_ALLOWED_ORIGINS", "*")
if _allowed_origins_env.strip() == "*":
    _cors_origins = "*"
else:
    _cors_origins = [
        origin.strip().rstrip("/")
        for origin in _allowed_origins_env.split(",")
        if origin.strip()
    ]

    # Always include localhost origins so dev tools can hit Render when needed.
    _cors_origins.extend(
        [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
    )

CORS(app, resources={r"/api/*": {"origins": _cors_origins}})

POSTS_DIR = Path(__file__).resolve().parent / "posts"


@dataclass(frozen=True)
class Post:
    id: int
    title: str
    author: str
    slug: str
    tags: List[str]
    read_time: str
    excerpt: str
    content_file: str


POSTS: List[Post] = [
    Post(
        id=1,
        title="Designing Impactful Learning Journeys",
        author="Asha Menon",
        slug="designing-impactful-learning-journeys",
        tags=["Learning Design", "Strategy"],
        read_time="6 min",
        excerpt="How to translate organizational goals into learner-centric pathways that stay flexible and measurable.",
        content_file="designing-impactful-learning-journeys.md",
    ),
    Post(
        id=2,
        title="Coaching Skills For Hybrid Teams",
        author="Ravi Kulkarni",
        slug="coaching-skills-for-hybrid-teams",
        tags=["Coaching", "Remote Work"],
        read_time="4 min",
        excerpt="A practical framework to help managers blend async feedback with live facilitation moments.",
        content_file="coaching-skills-for-hybrid-teams.md",
    ),
    Post(
        id=3,
        title="Micro-simulations That Stick",
        author="Tara Venkatesh",
        slug="micro-simulations-that-stick",
        tags=["Simulations", "Learning Design"],
        read_time="5 min",
        excerpt="Micro-simulations generate repetition without boredom. Here's how QurioSkill deploys them inside LMS workflows.",
        content_file="micro-simulations-that-stick.md",
    ),
]


def _serialize_post(post: Post) -> Dict:
    data = asdict(post)
    data.pop("content_file", None)
    return data


def _serialize_posts(filtered_posts: List[Post]):
    return [_serialize_post(post) for post in filtered_posts]


def _find_post_by_slug(slug: str) -> Optional[Post]:
    slug = slug.lower()
    return next((post for post in POSTS if post.slug.lower() == slug), None)


@app.route("/api/posts")
def get_posts():
    tag_filter = request.args.get("tag", "").strip().lower()
    if tag_filter:
        filtered = [post for post in POSTS if tag_filter in (tag.lower() for tag in post.tags)]
    else:
        filtered = POSTS
    return jsonify(_serialize_posts(filtered))


@app.route("/api/tags")
def get_tags():
    tags = sorted({tag for post in POSTS for tag in post.tags})
    return jsonify(tags)


@app.route("/api/posts/<string:slug>")
def get_post(slug: str):
    post = _find_post_by_slug(slug)
    if not post:
        abort(404)
    md_path = POSTS_DIR / post.content_file
    if not md_path.exists():
        abort(404)
    return jsonify(
        {
            "post": _serialize_post(post),
            "markdown": md_path.read_text(encoding="utf-8"),
        }
    )


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path: str):
    """
    Serve the React build output when it exists; fall back to a helpful message during development.
    """
    dist_dir = Path(app.static_folder or "")
    index_file = dist_dir / "index.html"
    if index_file.exists():
        if path and (dist_dir / path).exists():
            return send_from_directory(dist_dir, path)
        return send_from_directory(dist_dir, "index.html")
    return (
        jsonify(
            {
                "message": "Frontend not built yet. Run the React dev server from frontend/ or create a production build.",
                "available_endpoints": ["/api/posts", "/api/tags"],
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
