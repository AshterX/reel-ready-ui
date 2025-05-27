
import React from "react";
import { useVideoEditor } from "@/store/videoEditor";
import { Volume2, VolumeX, Text } from "lucide-react";

const EditorControls: React.FC = () => {
  const { muted, setMuted, overlayText, setOverlayText } = useVideoEditor();

  return (
    <div className="flex flex-col gap-6 md:flex-row items-start justify-between w-full mt-6 px-2">
      {/* Mute/Unmute */}
      <div className="flex flex-col items-start gap-2">
        <label className="font-medium flex items-center gap-2">
          <span>Audio:</span>
          <button
            onClick={() => setMuted(!muted)}
            className={`p-2 rounded-full border ${
              muted
                ? "bg-gray-300 border-gray-400 text-gray-600"
                : "bg-indigo-50 border-indigo-300 text-indigo-600"
            } transition hover:scale-110`}
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </label>
        <span className="text-xs text-gray-400">
          {muted ? "Video will be muted" : "Audio will be preserved"}
        </span>
      </div>
      {/* Overlay Text */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <label className="font-medium flex items-center gap-1" htmlFor="overlay-text">
          <Text className="w-5 h-5" /> Overlay Text
        </label>
        <input
          id="overlay-text"
          type="text"
          placeholder="Add overlay/caption here"
          className="bg-gray-50 border px-2 py-1 rounded-lg placeholder:text-gray-300"
          value={overlayText}
          onChange={(e) => setOverlayText(e.target.value)}
          maxLength={50}
        />
        <span className="text-xs text-gray-400">Will be shown as a caption.</span>
      </div>
    </div>
  );
};

export default EditorControls;
