"use client";

import { useEffect, useMemo, useState } from "react";
import { AtSign, MessageCircle, Plus, Send, ThumbsUp, Users, Hash, Search, X, Bell, Megaphone, BriefcaseBusiness } from "lucide-react";
import { usePeople } from "@/hooks/usePeople";
import { useProjects } from "@/hooks/useProjects";

type Comment = { id: string; authorId: string; body: string; createdAt: string };
type Reaction = { employeeId: string; emoji: string };
type Post = { id: string; authorId: string; body: string; channel: string; projectId: string; createdAt: string; comments: Comment[]; reactions: Reaction[] };

const STORAGE_KEY = "nexus-pms-collaboration-v1";
const CURRENT_USER_ID = "EMP-001";
const makeId = () => `COL-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const starterPosts: Post[] = [
  { id: "POST-WELCOME", authorId: "EMP-001", body: "Welcome to the collaboration space. Use this area for project updates, questions, decisions and cross-team discussions. Keep important decisions linked to the relevant project so they are easy to find later.", channel: "General", projectId: "", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), comments: [{ id: "C-WELCOME-1", authorId: "EMP-002", body: "Great. We can use project threads to keep implementation decisions together.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }], reactions: [{ employeeId: "EMP-003", emoji: "👍" }, { employeeId: "EMP-004", emoji: "👍" }] },
  { id: "POST-UPDATE", authorId: "EMP-002", body: "Please share blockers early and include the task or project context where possible. That will help the team follow up without losing information across separate chats.", channel: "Engineering", projectId: "", createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), comments: [], reactions: [] },
];

function timeLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function CollaborationClient() {
  const { employees } = usePeople();
  const { projects } = useProjects();
  const [posts, setPosts] = useState<Post[]>([]);
  const [ready, setReady] = useState(false);
  const [channel, setChannel] = useState("All conversations");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("General");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
  const [showComposer, setShowComposer] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setPosts(raw ? JSON.parse(raw) as Post[] : starterPosts);
    } catch {
      setPosts(starterPosts);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }
    catch { setNotice("Browser storage is full. Your latest changes may not persist."); }
  }, [posts, ready]);

  const channels = useMemo(() => ["All conversations", "General", "Engineering", "Announcements", ...projects.map(p => `Project: ${p.name}`)], [projects]);
  const visiblePosts = useMemo(() => posts.filter(post => {
    const project = projects.find(p => p.id === post.projectId);
    const channelMatch = channel === "All conversations" || post.channel === channel || (channel.startsWith("Project: ") && project?.name === channel.slice(9));
    const author = employees.find(e => e.id === post.authorId)?.name ?? "Unknown";
    const searchMatch = !query.trim() || `${post.body} ${author} ${post.channel} ${project?.name ?? ""} ${post.comments.map(c => c.body).join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return channelMatch && searchMatch;
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [posts, channel, query, projects, employees]);

  const employeeName = (id: string) => employees.find(e => e.id === id)?.name ?? "Former or unavailable member";
  const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  const createPost = () => {
    const body = draft.trim();
    if (!body) return;
    setPosts(current => [{ id: makeId(), authorId: CURRENT_USER_ID, body, channel: selectedChannel, projectId: selectedProject, createdAt: new Date().toISOString(), comments: [], reactions: [] }, ...current]);
    setDraft(""); setSelectedProject(""); setShowComposer(false); setNotice("Your update was posted.");
  };
  const addReply = (postId: string) => {
    const body = (replyDrafts[postId] ?? "").trim();
    if (!body) return;
    setPosts(current => current.map(post => post.id === postId ? { ...post, comments: [...post.comments, { id: makeId(), authorId: CURRENT_USER_ID, body, createdAt: new Date().toISOString() }] } : post));
    setReplyDrafts(current => ({ ...current, [postId]: "" }));
    setExpandedReplies(current => ({ ...current, [postId]: true }));
  };
  const toggleLike = (postId: string) => setPosts(current => current.map(post => {
    if (post.id !== postId) return post;
    const alreadyLiked = post.reactions.some(reaction => reaction.employeeId === CURRENT_USER_ID && reaction.emoji === "👍");
    return { ...post, reactions: alreadyLiked ? post.reactions.filter(reaction => !(reaction.employeeId === CURRENT_USER_ID && reaction.emoji === "👍")) : [...post.reactions, { employeeId: CURRENT_USER_ID, emoji: "👍" }] };
  }));

  return <main className="content">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div><div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700"><Users size={14}/> Team workspace</div><h1 className="text-2xl font-bold tracking-tight">Collaboration</h1><p className="mt-1 max-w-2xl text-sm text-slate-500">Share updates, discuss work and keep project conversations in one place.</p></div>
      <button className="btn btn-primary" onClick={() => setShowComposer(true)}><Plus size={16}/> Start a conversation</button>
    </div>

    {notice && <div className="mb-4 flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-800" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={14}/></button></div>}

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <section className="panel p-3"><div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Channels</div>{channels.map(item => <button key={item} onClick={() => setChannel(item)} className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium ${channel === item ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50"}`}><Hash size={14}/><span className="truncate">{item}</span></button>)}</section>
        <section className="panel p-3"><div className="mb-3 flex items-center gap-2 px-1 text-xs font-semibold"><Bell size={14} className="text-slate-400"/> Workspace guide</div><div className="space-y-3 px-1 text-xs text-slate-500"><p className="flex gap-2"><MessageCircle size={14} className="mt-0.5 shrink-0 text-teal-700"/> Start a thread for questions or decisions.</p><p className="flex gap-2"><BriefcaseBusiness size={14} className="mt-0.5 shrink-0 text-teal-700"/> Link project-related updates to a project.</p><p className="flex gap-2"><AtSign size={14} className="mt-0.5 shrink-0 text-teal-700"/> Mention colleagues by typing @ followed by their name.</p></div></section>
      </aside>

      <section className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-bold">{channel}</h2><p className="text-xs text-slate-500">{visiblePosts.length} {visiblePosts.length === 1 ? "conversation" : "conversations"}</p></div><div className="relative w-full sm:w-64"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input className="field pl-9" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search conversations..."/></div></div>

        {showComposer && <div className="panel p-4"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Start a conversation</h3><button className="btn btn-ghost !p-1" onClick={() => setShowComposer(false)} aria-label="Close composer"><X size={17}/></button></div><textarea className="field min-h-28 resize-y" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Share an update, ask a question, or record a decision... Use @Name to mention someone."/><div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]"><select className="field" value={selectedChannel} onChange={e => setSelectedChannel(e.target.value)}><option>General</option><option>Engineering</option><option>Announcements</option></select><select className="field" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}><option value="">No project linked</option>{projects.filter(p => !p.archived).map(project => <option key={project.id} value={project.id}>{project.name}</option>)}</select><button className="btn btn-primary" onClick={createPost} disabled={!draft.trim()}><Send size={14}/> Post update</button></div><p className="mt-2 text-[11px] text-slate-400">Mentions are currently plain text. Automatic notifications will be added with the backend integration.</p></div>}

        {visiblePosts.length === 0 && <div className="panel flex flex-col items-center px-5 py-12 text-center"><MessageCircle size={28} className="mb-3 text-slate-300"/><h3 className="text-sm font-semibold">No conversations found</h3><p className="mt-1 text-xs text-slate-500">Try another channel or search term, or start a new conversation.</p></div>}
        {visiblePosts.map(post => {
          const author = employeeName(post.authorId);
          const project = projects.find(p => p.id === post.projectId);
          const likes = post.reactions.filter(r => r.emoji === "👍").length;
          const liked = post.reactions.some(r => r.employeeId === CURRENT_USER_ID && r.emoji === "👍");
          const repliesOpen = expandedReplies[post.id] ?? post.comments.length > 0;
          return <article key={post.id} className="panel p-4 sm:p-5"><div className="flex items-start gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800">{initials(author)}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-xs font-bold text-slate-800">{author}</span><span className="text-[11px] text-slate-400">{timeLabel(post.createdAt)}</span></div><div className="mt-1 flex flex-wrap gap-1.5"><span className="pill bg-slate-100 text-slate-600">#{post.channel}</span>{project && <span className="pill bg-teal-50 text-teal-800">{project.name}</span>}</div></div></div><p className="my-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">{post.body.split(/(@[\w .'-]+)/g).map((part, index) => part.startsWith("@") ? <span key={index} className="font-semibold text-teal-700">{part}</span> : part)}</p><div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3"><button onClick={() => toggleLike(post.id)} className={`btn !px-2.5 !py-1.5 ${liked ? "bg-teal-50 text-teal-800" : "btn-ghost"}`}><ThumbsUp size={14}/>{likes || "Like"}</button><button onClick={() => setExpandedReplies(current => ({ ...current, [post.id]: !repliesOpen }))} className="btn btn-ghost !px-2.5 !py-1.5"><MessageCircle size={14}/>{post.comments.length} {post.comments.length === 1 ? "reply" : "replies"}</button></div>
            {repliesOpen && <div className="mt-3 space-y-3 border-l-2 border-slate-100 pl-3 sm:pl-4">{post.comments.map(comment => <div key={comment.id} className="flex gap-2"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">{initials(employeeName(comment.authorId))}</div><div className="min-w-0 flex-1 rounded-lg bg-slate-50 px-3 py-2"><div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-semibold">{employeeName(comment.authorId)}</span><span className="text-[10px] text-slate-400">{timeLabel(comment.createdAt)}</span></div><p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">{comment.body}</p></div></div>)}<div className="flex gap-2"><input className="field !py-2" value={replyDrafts[post.id] ?? ""} onChange={e => setReplyDrafts(current => ({ ...current, [post.id]: e.target.value }))} onKeyDown={e => { if (e.key === "Enter") addReply(post.id); }} placeholder="Write a reply..."/><button className="btn btn-secondary !px-3" onClick={() => addReply(post.id)} disabled={!(replyDrafts[post.id] ?? "").trim()} aria-label="Send reply"><Send size={14}/></button></div></div>}
          </article>;
        })}
      </section>
    </div>
    <div className="mt-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-800"><Megaphone size={15} className="mt-0.5 shrink-0"/><p><strong>Prototype limitation:</strong> Conversations are stored in this browser only. They are not shared with other users or devices. Mention text does not send notifications, and this frontend does not enforce project or department access permissions.</p></div>
  </main>;
}
