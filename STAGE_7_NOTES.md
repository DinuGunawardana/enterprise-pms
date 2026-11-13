# Stage 7 — Document Management

## Included
- Dedicated `/documents` workspace with list and grid layouts.
- Search, active/archived scope filter, and document-type filter.
- Create text-based document notes and upload existing files (2 MB prototype limit).
- Document metadata: title, description, type, owner, department, project, size, timestamps, and lifecycle state.
- Visibility options: Private, Explicitly Shared, Department, and Global (admin-controlled label only).
- Explicit access list for active employees or departments with View, Comment, and Edit levels.
- Document details, image preview, download, edit, archive, restore, and permanent local deletion.
- Metadata and small uploaded file data persisted in browser localStorage.

## Important prototype limitations
- This stage is frontend-only. Data is local to the browser and is not shared between employees or devices.
- The visibility and access-list controls are metadata only. They are not authorization or security boundaries.
- File bytes are stored as data URLs in localStorage and limited to 2 MB per file. This is for demonstration only, not production storage.
- Google Drive, Shared Drive provisioning, native Docs/Sheets/Slides creation, Supabase document registry, server-side permission checks, audit logging, retry/reconciliation, and secure preview/download are not connected.
- No rich-text editor, version history, or inline comment thread is included. Comment is represented as a share permission level only.
- Do not upload confidential or personal information into this prototype.

## Acceptance checklist
1. Open `/documents`; confirm the library loads.
2. Create a note with a title and content; refresh and confirm it remains.
3. Upload a small PDF or image; confirm it appears in the library and can be downloaded.
4. Try a file larger than 2 MB; confirm a validation message appears.
5. Associate a document with a department and a project.
6. Set each visibility option and add an employee/department share with View, Comment, or Edit.
7. Search by title, description, or file name; filter by type.
8. Switch between list and grid views.
9. Open document details; check metadata and image preview where applicable.
10. Edit a document; confirm the update persists after refresh.
11. Archive a document, switch to Archived, restore it, and verify it returns to Active.
12. Permanently delete a test document and confirm it disappears after refresh.
13. Test at desktop and mobile widths.
14. Run `npm run build` and confirm it completes without errors.

## Storage key
`nexus-pms-documents-v1`
