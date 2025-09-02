# me-api-playground
Me-API Playground is a full-stack personal portfolio API built with FastAPI, PostgreSQL, and React. It features CRUD operations, advanced queries, search, and a minimal frontend showcasing skills and projects. Dockerized for easy deployment, ideal for job placement demos.
# Me-API Playground

A modern personal portfolio API and frontend project built using FastAPI, PostgreSQL, and React/Next.js. This project offers CRUD operations, advanced querying, search functionality, and a minimal frontend showcasing skills and projects. It’s fully dockerized and ideal for job placement demos.

## Features

- Complete CRUD API for profile, education, skills, projects, and work experience
- Filter projects by skill and retrieve top skills
- Search across all profile content
- Health check endpoint for monitoring
- Responsive React frontend with project filtering and skill visualization
- Docker support for easy deployment
- Auto-generated API documentation with Swagger/OpenAPI

## Technology Stack

- Backend: FastAPI, Python, SQLAlchemy, Alembic migrations
- Database: PostgreSQL
- Frontend: React, Next.js
- Deployment: Docker, Render (backend), Vercel (frontend)

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js and npm

### Installation

1. Clone the repository  
   `git clone https://github.com/yourusername/me-api-playground.git`

2. Start services with Docker Compose  
   `docker-compose up -d`

3. Access:  
   - Backend API docs: `http://localhost:8000/docs`  
   - Frontend UI: `http://localhost:3000`

### Manual Setup

Backend:
