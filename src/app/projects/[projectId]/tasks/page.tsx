import {TasksClient} from "@/components/tasks/TasksClient";
export default async function ProjectTasksPage({params}:{params:Promise<{projectId:string}>}){const {projectId}=await params;return <TasksClient projectId={projectId}/>}
