import { create } from "zustand";
type ParkState = {
  progress: number;
  section: number;
  loading: boolean;
  sound: boolean;
  quality: "high" | "low";
  ride: boolean;
  reduced: boolean;
  set: (values: Partial<Omit<ParkState, "set">>) => void;
};
export const useParkStore = create<ParkState>((set) => ({
  progress: 0,
  section: 0,
  loading: true,
  sound: false,
  quality: window.innerWidth < 768 ? "low" : "high",
  ride: false,
  reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  set,
}));
