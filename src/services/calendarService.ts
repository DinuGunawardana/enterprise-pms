import type {CalendarEvent} from "@/types";
const KEY="nexus-pms-calendar-events-v1";
export function loadCalendarEvents():CalendarEvent[]{if(typeof window==="undefined")return [];try{return JSON.parse(localStorage.getItem(KEY)||"[]") as CalendarEvent[]}catch{return []}}
export function saveCalendarEvents(events:CalendarEvent[]){if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(events))}
