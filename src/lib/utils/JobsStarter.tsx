import axios from "axios";
import { backendPrefix } from "../../confg";

export const startJob = async (jobId: string) => {
  console.log(localStorage.getItem("autocliptoken"))
  try {
    await axios.post(
      `${backendPrefix}/api/jobs/${jobId}/start`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("autocliptoken")}` } }
    );
    return "success";
  } catch (error: any) {
    return "error";
  }
};
