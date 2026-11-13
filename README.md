# Enterprise PMS — Frontend Stage 4

Stage 4 adds the Task Management Module on top of the working Stage 3 frontend.

## Run locally

1. Extract this ZIP into a new folder (keep a backup of your working Stage 3 folder).
2. Open the extracted project folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000` (or the LAN URL printed by Next.js).

## Stage 4 features

- Task list at `/tasks` and project-specific task list at `/projects/[projectId]/tasks`.
- Create, edit, view and delete tasks.
- Assignee, reporter, start date, due date, priority, status and comma-separated labels.
- Search by task title, ID, description, assignee and labels.
- Filters by project, status, priority and assignee; sorting by due date, priority, name and last update.
- Kanban board with native drag-and-drop across To do, In progress, In review and Done.
- Subtasks with completion checkboxes and progress indicators.
- Task status can also be changed from the table and detail view.
- Task data is persisted in browser `localStorage` under `nexus-pms-demo-tasks`.
- Project detail pages include a shortcut to their project-specific task view.

## Important limitations

This is still a frontend-only demo. Data is stored separately in each browser and is not shared between users. Assignee options are demo users, not a live employee directory. Permissions, notifications, audit history, file attachments, backend validation and Supabase persistence are not implemented. Do not treat the local demo as production data.

## Notes

- Existing Stage 3 project functionality is retained.
- Existing task data from the dashboard is not automatically migrated; Stage 4 has its own task store.
- If you previously ran another copy of this app, open the extracted Stage 4 folder and run the commands from that folder.

## Stage 7 — Document management

The `/documents` route provides a local prototype for document notes, small file uploads, department/project associations, visibility metadata, explicit sharing permissions, search, filters, archive/restore, preview, and download. See `STAGE_7_NOTES.md` for setup expectations, limitations, and acceptance checks.

**Prototype warning:** document metadata and uploaded file data are stored in the current browser's localStorage. Visibility and sharing are not secure access controls. Do not use confidential files. Google Drive and Supabase integration are not part of this frontend-only stage.
