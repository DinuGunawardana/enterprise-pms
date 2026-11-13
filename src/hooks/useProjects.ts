"use client";
import {useEffect,useState} from "react";
import {loadProjects,saveProjects} from "@/services/projectService";
import type {ProjectSummary} from "@/types";
export function useProjects(){
 const [projects,setProjects]=useState<ProjectSummary[]>([]);
 const [ready,setReady]=useState(false);
 useEffect(()=>{setProjects(loadProjects());setReady(true)},[]);
 useEffect(()=>{if(ready)saveProjects(projects)},[projects,ready]);
 return {projects,setProjects,ready};
}
