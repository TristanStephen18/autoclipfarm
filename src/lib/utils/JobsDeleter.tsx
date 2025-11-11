import axios from "axios";
import { backendPrefix } from "../../confg";

export async function deleteJob (jobId: string){
    //will only work if status there has not been a clip that was created for referencing
    try{ 
        await axios.delete(`${backendPrefix}/api/jobs/${jobId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("autocliptoken")}`
            }
        })
        return "success";
    }catch(error){
        return "error";
    }
}