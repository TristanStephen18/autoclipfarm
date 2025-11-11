import JSZip from "jszip";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import type { Clips } from "../../hooks/jobs/clips";

export const handleDownloadAll = async (
  job: { title: string; id: string },
  clips: Clips[]
) => {
  if (!job || !clips?.length) {
    toast.error("No clips found for this job!");
    return;
  }

  const relatedClips = clips.filter((clip) => clip.jobId === job.id);
  if (!relatedClips.length) {
    toast.error("No clips belong to this job!");
    return;
  }

  const total = relatedClips.length;
  const safeTitle = job.title.replace(/[^a-z0-9_\-]/gi, "_");
  const zip = new JSZip();

  const loader = toast.loading(`Preparing ${total} clips for download...`);

  try {
    for (let i = 0; i < relatedClips.length; i++) {
      const clip = relatedClips[i];
      const clipUrl = clip.clipUrl;

      if (!clipUrl) {
        console.warn(`⚠️ Clip ${i + 1} has no URL, skipping.`);
        continue;
      }

      try {
        const response = await fetch(clipUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} when fetching clip`);
        }
        const blob = await response.blob();

        // Use job title + index as file name
        const fileName = `${safeTitle}_clip_${i + 1}.mp4`;
        zip.file(fileName, blob);
        console.log(`✅ Added ${fileName} to ZIP`);
      } catch (err) {
        console.error(`❌ Failed to fetch clip ${i + 1}:`, err);
      }
    }

    // ✅ Generate ZIP file and download
    toast.loading("Zipping all clips...", { id: loader });
    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, `${safeTitle}_Clips.zip`);
    toast.success(`✅ ${total} clips downloaded successfully!`, { id: loader });
  } catch (err: any) {
    console.error("❌ Error creating ZIP:", err);
    toast.error("Something went wrong while zipping clips!", { id: loader });
  } finally {
    toast.dismiss(loader);
  }
};
