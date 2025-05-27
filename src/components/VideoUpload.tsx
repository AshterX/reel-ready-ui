
import React, { useRef } from "react";
import { useVideoEditor } from "@/store/videoEditor";
import { Upload } from "lucide-react";

const VideoUpload: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setFile, reset } = useVideoEditor();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setFile(file, url);
    }
  };

  const onClick = () => {
    reset();
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-8 bg-card rounded-xl shadow-md border border-gray-200 animate-fade-in">
      <Upload className="w-12 h-12 text-indigo-600 mb-2" />
      <p className="text-lg font-medium text-gray-700">Upload a video to begin editing</p>
      <button
        className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        onClick={onClick}
      >
        Choose Video File
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export default VideoUpload;
