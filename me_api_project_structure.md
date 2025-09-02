
# Me-API Playground - Complete Project Structure

## Backend Structure (FastAPI + PostgreSQL)
```
me-api-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Environment configuration
│   ├── database.py             # Database connection setup
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User model (SQLAlchemy)
│   │   ├── education.py       # Education model
│   │   ├── skills.py          # Skills model
│   │   ├── projects.py        # Projects model
│   │   └── work.py            # Work experience model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py            # Pydantic schemas
│   │   ├── education.py
│   │   ├── skills.py
│   │   ├── projects.py
│   │   └── responses.py       # API response schemas
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── profile.py         # Profile CRUD endpoints
│   │   ├── projects.py        # Project query endpoints
│   │   ├── skills.py          # Skills query endpoints
│   │   ├── search.py          # Search endpoints
│   │   └── health.py          # Health check
│   ├── services/
│   │   ├── __init__.py
│   │   ├── profile_service.py # Business logic
│   │   ├── search_service.py  # Search implementation
│   │   └── skills_service.py  # Skills analysis
│   └── utils/
│       ├── __init__.py
│       ├── dependencies.py    # FastAPI dependencies
│       └── exceptions.py      # Custom exceptions
├── alembic/                   # Database migrations
│   ├── versions/
│   ├── alembic.ini
│   └── env.py
├── tests/
│   ├── test_profile.py
│   ├── test_projects.py
│   └── test_search.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml         # Local development
└── README.md

## Frontend Structure (React/Next.js)
```
me-api-frontend/
├── src/
│   ├── components/
│   │   ├── ProfileView.js     # Display profile data
│   │   ├── SearchBox.js       # Search interface
│   │   ├── ProjectsList.js    # Projects display
│   │   ├── SkillsChart.js     # Skills visualization
│   │   └── Layout.js          # Common layout
│   ├── pages/
│   │   ├── index.js           # Home page
│   │   ├── profile.js         # Profile page
│   │   ├── projects.js        # Projects page
│   │   └── search.js          # Search page
│   ├── services/
│   │   └── api.js             # API client
│   ├── hooks/
│   │   └── useApi.js          # Custom hooks
│   └── styles/
│       └── globals.css
├── public/
├── package.json
├── next.config.js
└── README.md

## Database Schema (PostgreSQL)
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(50),
    description TEXT
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE user_skills (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 10),
    years_experience DECIMAL(3,1),
    PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    demo_url VARCHAR(500),
    repo_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'completed',
    featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE project_skills (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    location VARCHAR(255),
    employment_type VARCHAR(50) DEFAULT 'full-time'
);

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'github', 'linkedin', 'portfolio', 'twitter', etc.
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(255)
);

-- Indexes for better query performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_education_user_id ON education(user_id);
CREATE INDEX idx_work_user_id ON work_experience(user_id);
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_project_skills_project_id ON project_skills(project_id);
CREATE INDEX idx_skills_category ON skills(category);
```
