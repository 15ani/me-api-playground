
# Example FastAPI Implementation for Me-API Playground

## main.py
```python
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import uvicorn
from datetime import datetime
from typing import List, Optional

from app.database import get_db, engine
from app.models import user as user_models
from app.schemas import user as user_schemas
from app.routers import profile, projects, skills, search, health

# Create database tables
user_models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Me-API Playground",
    description="Personal portfolio API with advanced querying capabilities",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(profile.router, prefix="/api/v1", tags=["Profile"])
app.include_router(projects.router, prefix="/api/v1", tags=["Projects"])
app.include_router(skills.router, prefix="/api/v1", tags=["Skills"])
app.include_router(search.router, prefix="/api/v1", tags=["Search"])
app.include_router(health.router, prefix="/api/v1", tags=["Health"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Me-API Playground",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## app/routers/profile.py
```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.services.profile_service import ProfileService

router = APIRouter()

@router.get("/profile", response_model=UserResponse)
async def get_profile(
    user_id: int = 1,  # For demo purposes
    db: Session = Depends(get_db)
):
    """Get complete user profile with all related data"""
    profile_service = ProfileService(db)
    profile = profile_service.get_complete_profile(user_id)

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    return profile

@router.post("/profile", response_model=UserResponse)
async def create_profile(
    profile_data: UserCreate,
    db: Session = Depends(get_db)
):
    """Create a new user profile"""
    profile_service = ProfileService(db)

    # Check if user already exists
    existing_user = profile_service.get_user_by_email(profile_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    return profile_service.create_profile(profile_data)

@router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_data: UserUpdate,
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    """Update existing user profile"""
    profile_service = ProfileService(db)

    updated_profile = profile_service.update_profile(user_id, profile_data)
    if not updated_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )

    return updated_profile
```

## app/routers/projects.py
```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.schemas.projects import ProjectResponse
from app.services.profile_service import ProfileService

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(
    skill: Optional[str] = Query(None, description="Filter projects by skill name"),
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    limit: int = Query(10, ge=1, le=50, description="Number of projects to return"),
    offset: int = Query(0, ge=0, description="Number of projects to skip"),
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    """Get projects with optional filtering by skill"""
    profile_service = ProfileService(db)

    projects = profile_service.get_projects_filtered(
        user_id=user_id,
        skill_filter=skill,
        featured_only=featured,
        limit=limit,
        offset=offset
    )

    return projects

@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific project by ID"""
    profile_service = ProfileService(db)
    project = profile_service.get_project_by_id(project_id)

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    return project
```

## app/routers/skills.py
```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.skills import SkillResponse, SkillSummary
from app.services.skills_service import SkillsService

router = APIRouter()

@router.get("/skills/top", response_model=List[SkillSummary])
async def get_top_skills(
    limit: int = Query(5, ge=1, le=20, description="Number of top skills to return"),
    category: Optional[str] = Query(None, description="Filter by skill category"),
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    """Get top skills by proficiency level"""
    skills_service = SkillsService(db)

    top_skills = skills_service.get_top_skills(
        user_id=user_id,
        limit=limit,
        category_filter=category
    )

    return top_skills

@router.get("/skills", response_model=List[SkillResponse])
async def get_all_skills(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    """Get all user skills grouped by category"""
    skills_service = SkillsService(db)
    return skills_service.get_skills_by_category(user_id)

@router.get("/skills/categories")
async def get_skill_categories(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    """Get all available skill categories"""
    skills_service = SkillsService(db)
    return skills_service.get_skill_categories(user_id)
```

## app/routers/search.py
```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.services.search_service import SearchService

router = APIRouter()

@router.get("/search")
async def search_content(
    q: str = Query(..., min_length=2, description="Search query"),
    type_filter: Optional[str] = Query(None, description="Filter by content type (projects, skills, education, work)"),
    limit: int = Query(10, ge=1, le=50),
    user_id: int = 1,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Search across all profile content"""
    search_service = SearchService(db)

    results = search_service.search_all_content(
        user_id=user_id,
        query=q,
        content_type_filter=type_filter,
        limit=limit
    )

    return {
        "query": q,
        "total_results": len(results),
        "results": results
    }
```

## app/routers/health.py
```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db

router = APIRouter()

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """Health check endpoint for liveness monitoring"""
    try:
        # Test database connection
        db.execute("SELECT 1")
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "ok" if db_status == "healthy" else "error",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_status,
        "version": "1.0.0"
    }
```
