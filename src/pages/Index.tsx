
import React from "react";
import VideoUpload from "@/components/VideoUpload";
import VideoPlayer from "@/components/VideoPlayer";
import EditorControls from "@/components/EditorControls";
import ResultViewer from "@/components/ResultViewer";
import { useVideoEditor } from "@/store/videoEditor";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { fileUrl, isProcessing } = useVideoEditor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-start px-2 py-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 mt-6 mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-indigo-700 tracking-tight animate-fade-in">
          🎬 Video Editor App
        </h1>
        <p className="text-lg text-gray-600 mb-4">Upload and edit your videos—trim, mute, add text overlays, and create thumbnails!</p>
        {!fileUrl && <VideoUpload />}
        {fileUrl && (
          <>
            <VideoPlayer editable />
            <EditorControls />
            <ResultViewer />
          </>
        )}
        {isProcessing && (
          <div className="flex justify-center mt-4">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          </div>
        )}
      </div>
      <footer className="mt-10 text-xs text-gray-400">
        Built with <span className="font-bold text-indigo-600">Lovable</span> 🦄 | Example Editor
      </footer>
    </div>
  );
};

export default Index;
