# Stage 8 — Collaboration

## Included
- Collaboration workspace route: `/collaboration`.
- General, Engineering and Announcements channels.
- Project-linked conversations and project-specific channel filters.
- Create conversation posts, reply to posts, and toggle a like reaction.
- Search across post text, author, channel, linked project and replies.
- Relative activity ordering and author/time labels.
- Browser-local persistence using `nexus-pms-collaboration-v1`.
- Responsive layout and sidebar navigation entry.

## Prototype boundaries
- Data is local to the current browser; users do not see shared real-time conversations.
- `@mentions` are currently highlighted plain text, not resolved user references.
- No push/email/in-app notifications are sent.
- No real-time updates, attachments, edit/delete moderation, read receipts, or server-side access control.
- Do not use this prototype for confidential discussions until Supabase authentication, database policies, audit logging and authorization are implemented.

## Acceptance checklist
- [ ] `/collaboration` loads from the sidebar and direct URL.
- [ ] Create a post in General.
- [ ] Create a post in Engineering and Announcements.
- [ ] Link a post to an active project.
- [ ] Filter by channel and project.
- [ ] Search post body, author, project and replies.
- [ ] Add a reply and verify reply count.
- [ ] Toggle Like on and off.
- [ ] Refresh the browser and verify posts, replies and reactions persist.
- [ ] Verify layout at desktop and mobile widths.
- [ ] `npm run build` completes successfully.

## Storage
Posts are stored in localStorage under `nexus-pms-collaboration-v1`. Clearing browser storage removes prototype collaboration data.
