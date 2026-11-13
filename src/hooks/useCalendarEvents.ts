"use client";
import {useEffect,useState} from "react";
import type {CalendarEvent} from "@/types";
import {loadCalendarEvents,saveCalendarEvents} from "@/services/calendarService";
export function useCalendarEvents(){
 const [events,setEvents]=useState<CalendarEvent[]>([]);
 const [ready,setReady]=useState(false);
 useEffect(()=>{setEvents(loadCalendarEvents());setReady(true)},[]);
 useEffect(()=>{if(ready)saveCalendarEvents(events)},[events,ready]);
 return {events,setEvents,ready};
}
