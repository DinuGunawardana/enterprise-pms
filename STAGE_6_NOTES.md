# Stage 6 — Calendar

## Included
- Calendar month, week and agenda views
- Task due-date and project milestone overlays
- Project and event-type filters
- Selected-day detail panel
- Create and delete meeting/reminder events
- Local browser persistence for custom events
- Sidebar Calendar navigation already points to `/calendar`

## Run
npm install
npm run dev

## Notes and limitations
- Task due dates and project milestones are read from existing Stage 4/3 data.
- Meetings and reminders are stored in localStorage.
- Events are local to the current browser and are not shared between users.
- No attendee invitations, recurrence, external calendar sync, timezone conversion, or server-side authorization in this frontend-only stage.
- Week/month dates use the browser's local date environment.
