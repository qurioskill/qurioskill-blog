# QurioSkill Blog

Clean React + Flask starter for a tag-aware blog that showcases training stories from QurioSkill.

## Project layout

```
backend/   # Flask API and production static file server
frontend/  # React (Vite) SPA that consumes the API
```

## Running locally

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
flask --app app run
```

The API is now available at `http://127.0.0.1:5000/api/posts` and `/api/tags`. When you later build the React app, Flask will automatically serve the static files from `frontend/dist`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev  # uses the proxy set up in vite.config.js
```

The Vite dev server proxies `/api/*` requests to Flask (see `vite.config.js`), so both services can run together with hot reloading. In production the React bundle now calls the API via same-origin paths (`/api/...`). Only set `VITE_API_BASE_URL` if you need to point the frontend elsewhere; locally it still defaults to `http://127.0.0.1:5000`.

## Production build

1. `cd frontend && npm run build`
2. Copy the generated `frontend/dist` directory to the server alongside `backend`.
3. Start Flask (`flask --app app run --host 0.0.0.0 --port 5000` or deploy via gunicorn). Hitting `/` now serves the React bundle, while `/api/*` keeps returning JSON.

## Deploying on Render (Docker)

1. Push this repo to GitHub (or any git provider Render supports).
2. In Render, create a **Web Service**, choose **Docker** as the environment, and point it to this repository.
3. Render will build the image automatically using `Dockerfile`. The multi-stage build installs the backend, builds the React app, and copies the static assets for Flask to serve.
4. Set the **Environment Variables**:
   - `BLOG_ALLOWED_ORIGINS=https://your-production-domain` (comma-separated list, **no trailing slashes**). The backend normalizes entries and still allows localhost for debugging. Leaving this unset falls back to `*`.
   - Optionally set `WORKERS=4` (or whatever fits the instance size) to control the number of Gunicorn workers.
5. The default start command already runs `gunicorn --bind 0.0.0.0:$PORT --workers=${WORKERS:-3} app:app`, so you can leave Render’s start command blank or override it if you want different flags.
6. Deploy — Render health checks should succeed once Gunicorn starts listening on the assigned port.

## Customizing content

- Post metadata (title, tags, read time) lives in `backend/app.py` inside the `POSTS` list.
- Each post also defines a unique `slug` that becomes `https://your-site/posts/<slug>`.
- Full article bodies live as Markdown files in `backend/posts/`. The filename referenced in `content_file` must exist and will be injected into the post page.
- Frontend visuals are controlled via `frontend/src/styles.css`.
