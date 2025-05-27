
import { create } from "zustand";

interface VideoEditorState {
  file: File | null;
  fileUrl: string | null;
  trim: { start: number; end: number };
  muted: boolean;
  overlayText: string;
  thumbnailUrl: string | null;
  isProcessing: boolean;
  editedUrl: string | null;
  setFile: (file: File | null, url: string | null) => void;
  setTrim: (trim: { start: number; end: number }) => void;
  setMuted: (muted: boolean) => void;
  setOverlayText: (text: string) => void;
  setThumbnailUrl: (url: string | null) => void;
  setProcessing: (processing: boolean) => void;
  setEditedUrl: (url: string | null) => void;
  reset: () => void;
}

export const useVideoEditor = create<VideoEditorState>((set) => ({
  file: null,
  fileUrl: null,
  trim: { start: 0, end: 0 },
  muted: false,
  overlayText: "",
  thumbnailUrl: null,
  isProcessing: false,
  editedUrl: null,
  setFile: (file, url) => set({ file, fileUrl: url }),
  setTrim: (trim) => set({ trim }),
  setMuted: (muted) => set({ muted }),
  setOverlayText: (text) => set({ overlayText: text }),
  setThumbnailUrl: (url) => set({ thumbnailUrl: url }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setEditedUrl: (url) => set({ editedUrl: url }),
  reset: () =>
    set({
      file: null,
      fileUrl: null,
      trim: { start: 0, end: 0 },
      muted: false,
      overlayText: "",
      thumbnailUrl: null,
      isProcessing: false,
      editedUrl: null,
    }),
}));
