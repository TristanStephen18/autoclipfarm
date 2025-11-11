import axios from "axios";
import { backendPrefix } from "../../confg";

export async function updateClip(clipId: number, payload: any) {
  try {
    await axios.put(`${backendPrefix}/api/clips/${clipId}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("autocliptoken")}`,
      },
    });
    return "success";
  } catch (error: any) {
    return "error";
  }
}
