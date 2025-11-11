import axios from "axios";
import { backendPrefix } from "../../confg";

export async function updateJob(
  jobId: string,
  payload: any,
) {
  try {
    await axios.put(`${backendPrefix}/api/jobs/${jobId}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("autocliptoken")}`,
      },
    });
    return "success";
  } catch (error: any) {
    return "error";
  }
}
