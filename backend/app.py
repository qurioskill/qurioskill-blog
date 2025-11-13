from __future__ import annotations

from dataclasses import asdict, dataclass
import os
from pathlib import Path
from typing import Dict, List, Optional, Set

from flask import Flask, abort, jsonify, request, send_from_directory

app = Flask(
    __name__,
    static_folder=str(Path(__file__).resolve().parent.parent / "frontend" / "dist"),
    static_url_path="/",
)

def _normalize_origin(value: str) -> str:
    return value.strip().rstrip("/").lower()


_allowed_origins_env = os.environ.get("BLOG_ALLOWED_ORIGINS", "*")
if _allowed_origins_env.strip() == "*":
    _cors_origins = "*"
    _allowed_origin_set: Optional[Set[str]] = None
else:
    normalized_origins = {
        _normalize_origin(origin)
        for origin in _allowed_origins_env.split(",")
        if origin.strip()
    }
    normalized_origins.update(
        {
            _normalize_origin("http://localhost:5173"),
            _normalize_origin("http://127.0.0.1:5173"),
            _normalize_origin("http://localhost:3000"),
            _normalize_origin("http://127.0.0.1:3000"),
        }
    )
    _allowed_origin_set = normalized_origins
    _cors_origins = list(normalized_origins)

def _origin_allowed(origin: Optional[str]) -> bool:
    if _cors_origins == "*":
        return True
    if not origin or not _allowed_origin_set:
        return False
    return _normalize_origin(origin) in _allowed_origin_set


def _origin_header_value(origin: Optional[str]) -> str:
    if _cors_origins == "*":
        return "*" if not origin else _normalize_origin(origin)
    assert origin is not None
    return _normalize_origin(origin)


@app.after_request
def _apply_cors_headers(response):
    origin = request.headers.get("Origin")
    if _origin_allowed(origin):
        response.headers["Access-Control-Allow-Origin"] = _origin_header_value(origin)
        response.headers["Access-Control-Allow-Methods"] = "GET,OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = request.headers.get(
            "Access-Control-Request-Headers", "Authorization,Content-Type"
        )
        existing_vary = response.headers.get("Vary")
        response.headers["Vary"] = "Origin" if not existing_vary else f"{existing_vary}, Origin"
    return response


@app.route("/api", methods=["OPTIONS"])
@app.route("/api/<path:_unused>", methods=["OPTIONS"])
def _cors_preflight(_unused: Optional[str] = None):
    return ("", 204)

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
        title="Hello World in Python",
        author="Madhav Malhotra",
        slug="hello-world-in-python",
        tags=["Software Programming"],
        read_time="6 min",
        excerpt="How to translate organizational goals into learner-centric pathways that stay flexible and measurable.",
        content_file="hello-world-in-python.md",
    ),
    Post(
        id=2,
        title="Why Programming is Fun",
        author="Madhav Malhotra",
        slug="why-programming-is-fun",
        tags=["Software Programming"],
        read_time="4 min",
        excerpt="A practical framework to help managers blend async feedback with live facilitation moments.",
        content_file="why-programming-is-fun.md",
    ),
    Post(
        id=3,
        title="What is Programming?",
        author="Tara Venkatesh",
        slug="what-is-programming",
        tags=["Software Programming"],
        read_time="5 min",
        excerpt="Micro-simulations generate repetition without boredom. Here's how QurioSkill deploys them inside LMS workflows.",
        content_file="what-is-programming.md",
    ),
]


def _read_post_markdown(post: Post) -> Optional[str]:
    md_path = POSTS_DIR / post.content_file
    if not md_path.exists():
        return None
    return md_path.read_text(encoding="utf-8")


def _serialize_post(post: Post, include_markdown: bool = False) -> Dict:
    data = asdict(post)
    content_file = data.pop("content_file", None)
    if include_markdown and content_file:
        markdown = _read_post_markdown(post)
        if markdown is not None:
            data["markdown"] = markdown
    return data


def _serialize_posts(filtered_posts: List[Post], include_markdown: bool = False):
    return [_serialize_post(post, include_markdown) for post in filtered_posts]


def _find_post_by_slug(slug: str) -> Optional[Post]:
    slug = slug.lower()
    return next((post for post in POSTS if post.slug.lower() == slug), None)


def _parse_list_arg(value: Optional[str]) -> Set[str]:
    if not value:
        return set()
    return {part.strip().lower() for part in value.split(",") if part.strip()}


@app.route("/api/posts")
def get_posts():
    tag_filter = request.args.get("tag", "").strip().lower()
    if tag_filter:
        filtered = [post for post in POSTS if tag_filter in (tag.lower() for tag in post.tags)]
    else:
        filtered = POSTS
    include_params = _parse_list_arg(request.args.get("include"))
    include_markdown = {"markdown", "content"}.intersection(include_params)
    return jsonify(_serialize_posts(filtered, bool(include_markdown)))


@app.route("/api/tags")
def get_tags():
    tags = sorted({tag for post in POSTS for tag in post.tags})
    return jsonify(tags)


@app.route("/api/posts/<string:slug>")
def get_post(slug: str):
    post = _find_post_by_slug(slug)
    if not post:
        abort(404)
    markdown = _read_post_markdown(post)
    if markdown is None:
        abort(404)
    return jsonify(
        {
            "post": _serialize_post(post),
            "markdown": markdown,
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
