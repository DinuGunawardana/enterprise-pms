import {demoTaskItems} from "@/data/tasks";
import type {TaskItem} from "@/types";
const KEY="nexus-pms-demo-tasks";
export function loadTasks():TaskItem[]{if(typeof window==="undefined")return demoTaskItems;try{const raw=localStorage.getItem(KEY);if(!raw)return demoTaskItems;const parsed=JSON.parse(raw);return Array.isArray(parsed)?parsed:demoTaskItems}catch{return demoTaskItems}}
export function saveTasks(tasks:TaskItem[]){if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(tasks))}
