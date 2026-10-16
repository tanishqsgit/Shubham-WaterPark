import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParkStore } from "../store/useParkStore";
gsap.registerPlugin(ScrollTrigger);
export function useJourney() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const start = () => {
      cleanup();
      const reduced = media.matches;
      useParkStore.getState().set({ reduced });
      const lenis = reduced
        ? null
        : new Lenis({ duration: 1.15, anchors: true, smoothWheel: true });
      lenis?.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      if (lenis) gsap.ticker.add(tick);
      const triggers = [
        ...document.querySelectorAll<HTMLElement>("[data-section]"),
      ].map((element, i) =>
        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) useParkStore.getState().set({ section: i });
          },
        }),
      );
      const progress = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) =>
          useParkStore.getState().set({ progress: self.progress }),
      });
      const context = gsap.context(() => {
        if (!reduced)
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }),
          );
      });
      ScrollTrigger.refresh();
      cleanup = () => {
        lenis?.destroy();
        gsap.ticker.remove(tick);
        triggers.forEach((t) => t.kill());
        progress.kill();
        context.revert();
      };
    };
    start();
    media.addEventListener("change", start);
    return () => {
      cleanup();
      media.removeEventListener("change", start);
    };
  }, []);
}
