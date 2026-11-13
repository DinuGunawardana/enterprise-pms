import type { PmsDocument } from "@/types";
const KEY="nexus-pms-documents-v1";
export function loadDocuments():PmsDocument[]{if(typeof window==="undefined")return [];try{return JSON.parse(localStorage.getItem(KEY)||"[]") as PmsDocument[]}catch{return []}}
export function saveDocuments(items:PmsDocument[]){if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(items))}
