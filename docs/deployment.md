# Deployment & Docker Guide

## Local Run via Docker Compose
```bash
# Build and launch entire microservices stack
docker compose up --build -d

# Verify container health
docker compose ps
```

## Environment File (.env)
Copy `.env.example` to `.env` before building production images.
