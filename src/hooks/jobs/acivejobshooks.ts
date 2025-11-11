import { useState } from "react";

export function useActiveJobsHooks () {
    const [youtubeUrl, setYoutubeUrl] = useState("");
      const [videoFile, setVideoFile] = useState<File | null>(null);
      const [uploadedVideo, setUploadedVideo] = useState<{
        url: string;
        title?: string;
      } | null>(null);
      const [aiInstructions, setAiInstructions] = useState("");
      const [contentRights, setContentRights] = useState(false);
      const [uploading, setUploading] = useState(false);
      const [clipLengthMin, setClipLengthMin] = useState(20);
      const [clipLengthMax, setClipLengthMax] = useState(60);
      const [clipsPerVideo, setClipsPerVideo] = useState(10);
      const [variationsPerClip, setVariationsPerClip] = useState(3);

      return {
        youtubeUrl,
        setYoutubeUrl,
        videoFile,
        setVideoFile,
        uploadedVideo,
        setUploadedVideo,
        aiInstructions,
        setAiInstructions,
        contentRights,
        setContentRights,
        uploading,
        setUploading,
        clipLengthMax,
        setClipLengthMax,
        clipLengthMin,
        setClipLengthMin,
        clipsPerVideo,
        setClipsPerVideo,
        variationsPerClip,
        setVariationsPerClip
      }
}