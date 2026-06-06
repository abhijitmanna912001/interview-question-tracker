# Interview Question Tracker

A simple full-stack app for software engineering candidates to track DSA problems and revision status.

## Product Requirements Document

### Purpose

The Interview Question Tracker helps candidates record solved interview problems, find them later, and plan revisions.

### Core Features

- Add a problem with title, platform, difficulty, topic, status, and optional notes.
- View all problems in a responsive UI.
- Search by problem title.
- Filter by difficulty and topic.
- Update a problem status from the list.
- Delete a problem.
- Show the total number of solved problems.

### Out of Scope

- Authentication
- Docker
- Redis
- Cloud deployment
- Multi-user accounts
- Enterprise-grade permissions or analytics

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL
- API style: REST

## PostgreSQL Schema

The schema lives in `backend/src/db/schema.sql`.

```sql
CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Solved', 'Revision Needed', 'Unsolved')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoint Design

Base URL: `/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Check API and database health |
| `GET` | `/problems?search=&difficulty=&topic=` | List problems and total solved count |
| `POST` | `/problems` | Create a problem |
| `PATCH` | `/problems/:id/status` | Update problem status |
| `DELETE` | `/problems/:id` | Delete a problem |

## Folder Structure

```text
backend/
  src/
    controllers/
    db/
    routes/
    services/
    types/
    validators/
frontend/
  src/
    api/
    components/
    styles/
    types/
```

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Create the database

```bash
createdb interview_tracker
```

### 3. Configure backend environment

```bash
cp backend/.env.example backend/.env
```

Default value:

```text
DATABASE_URL=postgres://localhost:5432/interview_tracker
PORT=5001
```

Adjust the `DATABASE_URL` if your local PostgreSQL user/password setup requires it.

### 4. Run the schema

```bash
npm run db:schema --prefix backend
```

This command uses `postgres://localhost:5432/interview_tracker` by default. For a custom connection string, run:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/interview_tracker npm run db:schema --prefix backend
```

### 5. Start the app

```bash
npm run dev
```

Backend: `http://localhost:5001`  
Frontend: `http://localhost:5173`

## Optional Demo Data

```sql
INSERT INTO problems (title, platform, difficulty, topic, status, notes)
VALUES
  ('Two Sum', 'LeetCode', 'Easy', 'Arrays', 'Solved', 'Use hash map for O(n).'),
  ('Longest Increasing Subsequence', 'LeetCode', 'Medium', 'DP', 'Revision Needed', 'Review binary search optimization.'),
  ('Dijkstra Algorithm', 'GFG', 'Hard', 'Graphs', 'Unsolved', 'Practice priority queue implementation.');
```

## Development Plan

1. Build the Express API and PostgreSQL schema.
2. Build the React UI with form, filters, list, solved count, loading states, and errors.
3. Wire frontend calls to the REST API.
4. Validate using backend and frontend TypeScript builds.

## Build Checks

```bash
npm run build --prefix backend
npm run build --prefix frontend
```
