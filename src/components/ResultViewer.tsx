
import React, { useRef, useEffect, useState } from "react";
import { useVideoEditor } from "@/store/videoEditor";
import { toast } from "@/hooks/use-toast";
import { Download, Scissors } from "lucide-react";

const ResultViewer: React.FC = () => {
  const { file, fileUrl, trim, muted, overlayText, thumbnailUrl, setThumbnailUrl, editedUrl, setEditedUrl, setProcessing, isProcessing, reset } = useVideoEditor();
  const [showThumbnail, setShowThumbnail] = useState(false);

  // For simulating: Generate thumbnail by drawing a canvas from the trimmed start timestamp
  const generateThumbnail = async () => {
    if (!fileUrl) return;
    setProcessing(true);
    setShowThumbnail(false);
    const video = document.createElement("video");
    video.src = fileUrl;
    video.currentTime = trim.start;
    video.crossOrigin = "anonymous";
    await video.play().catch(() => {}); // Browsers may block autoplay, fallback to load
    video.pause();
    video.currentTime = trim.start;
    const canvas = document.createElement("canvas");
    video.addEventListener("loadeddata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/png");
      setThumbnailUrl(url);
      setShowThumbnail(true);
      setProcessing(false);
      toast({ title: "Thumbnail Generated!" });
    });
  };

  // For simulating: "Apply" all edits and return a preview (we just play trimmed, muted video + caption).
  const handleDownload = () => {
    // Simulate "download" (optional: use mediarecorder, but here just download original)
    if (!file) return;
    const fakeEditedBlob = file;
    const url = URL.createObjectURL(fakeEditedBlob);
    setEditedUrl(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited-video.mp4";
    a.click();
    toast({ title: "Video Downloaded!" });
  };

  if (!fileUrl) return null;

  return (
    <div className="w-full mt-8 flex flex-col md:flex-row gap-4 items-start justify-between">
      <div className="w-full md:w-2/3">
        <div className="relative rounded-lg shadow-lg overflow-hidden border bg-black">
          <video
            src={fileUrl}
            className="w-full max-h-[340px]"
            controls
            muted={muted}
            loop
            style={{ outline: "none" }}
            autoPlay={false}
          />
          {/* Overlay text simulation */}
          {overlayText && (
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded text-lg shadow backdrop-blur font-semibold pointer-events-none animate-fade-in">
              {overlayText}
            </div>
          )}
        </div>
        <div className="flex mt-4 gap-4 items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5" /> Download Edited Video
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
            onClick={reset}
          >
            <Scissors className="w-5 h-5" /> Start Over
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
        <button
          className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition"
          onClick={generateThumbnail}
          disabled={isProcessing}
        >
          {isProcessing ? "Generating..." : "Generate Thumbnail"}
        </button>
        {showThumbnail && thumbnailUrl && (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="w-48 h-32 object-cover rounded shadow border"
            />
            <a
              href={thumbnailUrl}
              download="video-thumbnail.png"
              className="text-indigo-600 underline hover:text-indigo-800 text-sm mt-2"
            >
              Download Thumbnail
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultViewer;
