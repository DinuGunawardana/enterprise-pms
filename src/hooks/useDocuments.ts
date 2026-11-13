"use client";
import {useEffect,useState} from "react";
import type {PmsDocument} from "@/types";
import {loadDocuments,saveDocuments} from "@/services/documentService";
export function useDocuments(){const[documents,setDocuments]=useState<PmsDocument[]>([]);const[ready,setReady]=useState(false);useEffect(()=>{setDocuments(loadDocuments());setReady(true)},[]);useEffect(()=>{if(ready){try{saveDocuments(documents)}catch{window.dispatchEvent(new CustomEvent("pms-storage-error"))}}},[documents,ready]);return{documents,setDocuments,ready}}
