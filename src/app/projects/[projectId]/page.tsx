import {ProjectDetailsClient} from "@/components/projects/ProjectDetailsClient";
export default async function ProjectDetailsPage({params}:{params:Promise<{projectId:string}>}){
 const {projectId}=await params;
 return <ProjectDetailsClient projectId={projectId}/>;
}
