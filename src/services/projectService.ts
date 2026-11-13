import {demoProjects} from "@/data/demo";
import type {ProjectSummary} from "@/types";
const KEY="nexus-pms-demo-projects";
export function loadProjects():ProjectSummary[] {
 if(typeof window==="undefined") return demoProjects;
 try { const raw=localStorage.getItem(KEY); return raw?JSON.parse(raw) as ProjectSummary[]:demoProjects; } catch { return demoProjects; }
}
export function saveProjects(value:ProjectSummary[]) { if(typeof window!=="undefined") localStorage.setItem(KEY,JSON.stringify(value)); }
