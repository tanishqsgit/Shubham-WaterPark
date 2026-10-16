import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { attractions, park } from "../../data/attractions";
import { useParkStore } from "../../store/useParkStore";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}
export function Logo() {
  return (
    <a href="#home" className="logo" aria-label={`${park.name} home`}>
      <svg viewBox="0 0 45 45" aria-hidden="true">
        <path
          d="M5 25c6-20 23-20 29-4-8-7-16-3-16 4 9-8 19-3 22 5-8-5-15-2-20 3C13 39 5 34 5 25Z"
          fill="currentColor"
        />
        <path
          d="M6 38q8-6 16-1t17-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <span>
        shubham<small>WATER PARK · NASHIK</small>
      </span>
    </a>
  );
}
export function Header({ onBook }: { onBook: () => void }) {
  return (
    <header className="header">
      <Logo />
      <nav aria-label="Main navigation">
        <a href="#why-visit">{park.ui.about}</a>
        <a href="#adrenaline">{park.ui.attractions}</a>
        <a href="#visit">{park.ui.visit}</a>
      </nav>
      <button className="button button-yellow nav-book" onClick={onBook}>
        {park.ui.book}
        <Arrow />
      </button>
    </header>
  );
}
export function Progress() {
  const progress = useParkStore((s) => s.progress),
    section = useParkStore((s) => s.section);
  return (
    <>
      <div
        className="top-progress"
        role="progressbar"
        aria-label={park.ui.progress}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className="section-dots" aria-label={park.ui.progress}>
        {[
          { id: "home", name: park.ui.home },
          { id: "why-visit", name: park.ui.about },
          ...attractions,
          { id: "safety", name: park.ui.safety },
          { id: "visit", name: park.ui.visit },
        ].map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={`${park.ui.section} ${item.name}`}
            aria-current={section === i ? "step" : undefined}
          >
            <span />
            <b>{item.name}</b>
          </a>
        ))}
      </nav>
    </>
  );
}
export function Controls() {
  const sound = useParkStore((s) => s.sound),
    quality = useParkStore((s) => s.quality);
  const audio = useRef<AudioContext | null>(null);
  const toggleSound = async () => {
    if (sound) {
      await audio.current?.suspend();
      useParkStore.getState().set({ sound: false });
      return;
    }
    try {
      if (!audio.current) {
        const ctx = new AudioContext();
        audio.current = ctx;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++)
          data[i] = (Math.random() * 2 - 1) * 0.18;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 550;
        const gain = ctx.createGain();
        gain.gain.value = 0.14;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();
      }
      await audio.current.resume();
      useParkStore.getState().set({ sound: true });
    } catch {
      useParkStore.getState().set({ sound: false });
    }
  };
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  return (
    <div className="controls">
      <button onClick={() => void toggleSound()} aria-pressed={sound}>
        <span
          className={`sound-bars ${sound ? "playing" : ""}`}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
        </span>
        {sound ? park.ui.soundOn : park.ui.soundOff}
      </button>
      <button
        onClick={() =>
          useParkStore
            .getState()
            .set({ quality: quality === "high" ? "low" : "high" })
        }
        aria-label="Toggle rendering quality"
      >
        {quality === "high" ? park.ui.high : park.ui.low}
        <span aria-hidden="true">◉</span>
      </button>
    </div>
  );
}
export function Loader() {
  const loading = useParkStore((s) => s.loading),
    [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setPercentage((p) => (loading ? Math.min(92, p + 7) : 100)),
      60,
    );
    return () => clearInterval(timer);
  }, [loading]);
  return (
    <AnimatePresence>
      {percentage < 100 && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="status"
        >
          <div className="loader-drop">
            <div style={{ height: `${percentage}%` }} />
          </div>
          <strong>{park.ui.loading}</strong>
          <span>{percentage}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export function BookingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="booking-title"
    >
      <button
        className="close-dialog"
        aria-label={park.ui.close}
        onClick={onClose}
      >
        ×
      </button>
      <p className="eyebrow">{park.name}</p>
      <h2 id="booking-title">{park.bookingTitle}</h2>
      <p>{park.bookingNote}</p>
      <a className="button button-yellow" href="#visit" onClick={onClose}>
        {park.visit}
        <Arrow />
      </a>
      <small>{park.ui.bookingStatus}</small>
    </dialog>
  );
}
