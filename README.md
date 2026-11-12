# Enterprise PMS — Frontend Foundation

A new frontend-only implementation of the Enterprise Project Management System, based on Master Project Plan v1.1.

## Current scope

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- Responsive application shell
- Dashboard with clearly labelled demonstration data
- Sidebar navigation for planned PMS modules
- No Supabase connection
- No Google Drive connection
- No real authentication or authorization

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build check

```bash
npm run lint
npm run build
```

## Architecture rule

UI components must not import mock data directly. Pages consume feature services under `src/services/`. The current services return local demo fixtures. Later, implementations can be replaced with Supabase-backed services and a server-side Google Drive adapter without coupling those providers to UI components.

## Important

This is a frontend prototype foundation, not a secure production application. Demo data and navigation visibility are not access controls. Do not enter real employee, project, or confidential company information.

## Planned frontend modules

1. Application shell and design system
2. Dashboard
3. Projects and project details
4. Tasks, task details and Kanban
5. Calendar
6. Document management interface
7. Collaboration
8. Users and departments
9. Notifications
10. Reports and settings
