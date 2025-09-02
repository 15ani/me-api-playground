
# Deployment Configuration

## Docker Configuration

### Dockerfile (Backend)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: me_api_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:password123@postgres:5432/me_api_db
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - .:/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Render.com Deployment (Free Tier)

### render.yaml
```yaml
services:
  - type: web
    name: me-api-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: me-api-db
          property: connectionString
      - key: PYTHON_VERSION
        value: 3.11.0

  - type: web
    name: me-api-frontend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://me-api-backend.onrender.com

databases:
  - name: me-api-db
    databaseName: me_api
    user: me_api_user
```

## Vercel Deployment (Frontend)

### vercel.json
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-url.onrender.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## Environment Variables

### .env (Backend)
```
DATABASE_URL=postgresql://username:password@localhost:5432/me_api_db
SECRET_KEY=your-secret-key-here
DEBUG=True
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### .env.local (Frontend)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_NAME=Me-API Playground
```
