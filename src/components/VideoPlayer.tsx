
import React, { useRef, useEffect, useState } from "react";
import { useVideoEditor } from "@/store/videoEditor";
import { Volume2, VolumeX, Play, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  editable?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ editable }) => {
  const { fileUrl, trim, muted, setTrim } = useVideoEditor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const onLoaded = () => {
        setDuration(videoRef.current?.duration || 0);
        if (trim.end === 0 && videoRef.current?.duration) {
          setTrim({ start: 0, end: videoRef.current.duration });
        }
      };
      videoRef.current.addEventListener("loadedmetadata", onLoaded);
      return () => videoRef.current?.removeEventListener("loadedmetadata", onLoaded);
    }
  }, [fileUrl]);

  useEffect(() => {
    if (!seeking && videoRef.current) {
      const handler = () => setCurrent(videoRef.current!.currentTime);
      videoRef.current.addEventListener("timeupdate", handler);
      return () => videoRef.current?.removeEventListener("timeupdate", handler);
    }
  }, [seeking]);

  if (!fileUrl) return null;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setCurrent(n);
    setSeeking(true);
    if (videoRef.current) videoRef.current.currentTime = n;
    setSeeking(false);
  };

  const handlePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) vid.play();
    else vid.pause();
  };

  // Editable trim controls
  const onStartTrim = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrim({ start: Number(e.target.value), end: trim.end });
    if (videoRef.current) videoRef.current.currentTime = Number(e.target.value);
  };
  const onEndTrim = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrim({ start: trim.start, end: Number(e.target.value) });
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="rounded-lg overflow-hidden shadow">
        <video
          ref={videoRef}
          src={fileUrl}
          className="max-w-full max-h-[320px] bg-black"
          controls
          muted={muted}
          style={{ outline: "none" }}
        />
      </div>
      <div className="w-full flex flex-col mt-2">
        <div className="flex items-center gap-3 mt-1">
          <button className="p-2" onClick={() => videoRef.current && (videoRef.current.currentTime = Math.max(trim.start, (videoRef.current.currentTime ?? 0) - 5))}>
            <SkipBack className="w-5 h-5" />
          </button>
          <button className="p-2" onClick={handlePlayPause}>
            <Play className="w-7 h-7" />
          </button>
          <button className="p-2" onClick={() => videoRef.current && (videoRef.current.currentTime = Math.min(trim.end, (videoRef.current.currentTime ?? 0) + 5))}>
            <SkipForward className="w-5 h-5" />
          </button>
          <span className="flex-grow" />
          <span className="text-xs text-gray-500">
            {current.toFixed(1)} / {(duration || 0).toFixed(1)} s
          </span>
          <span className="ml-2">{muted ? <VolumeX className="w-4 h-4 text-gray-600" /> : <Volume2 className="w-4 h-4 text-gray-600" />}</span>
        </div>
        <input
          type="range"
          className="w-full accent-indigo-600"
          min={trim.start}
          max={trim.end}
          step={0.01}
          value={current}
          onChange={handleSeek}
        />
        {editable && (
          <div className="flex flex-col md:flex-row gap-2 items-center mt-3">
            <div className="flex items-center gap-2">
              <label className="text-sm">Trim Start:</label>
              <input
                type="number"
                min={0}
                max={trim.end}
                step={0.1}
                className="bg-gray-100 border px-2 py-1 rounded w-20"
                value={trim.start}
                onChange={onStartTrim}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Trim End:</label>
              <input
                type="number"
                min={trim.start}
                max={duration}
                step={0.1}
                className="bg-gray-100 border px-2 py-1 rounded w-20"
                value={trim.end}
                onChange={onEndTrim}
              />
            </div>
            <span className="text-xs text-gray-400">(seconds)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
