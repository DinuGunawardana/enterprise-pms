"use client";
import {useEffect,useState} from "react";
import {loadTasks,saveTasks} from "@/services/taskService";
import type {TaskItem} from "@/types";
export function useTasks(){const [tasks,setTasks]=useState<TaskItem[]>([]);const [ready,setReady]=useState(false);useEffect(()=>{setTasks(loadTasks());setReady(true)},[]);useEffect(()=>{if(ready)saveTasks(tasks)},[tasks,ready]);return {tasks,setTasks,ready}}
