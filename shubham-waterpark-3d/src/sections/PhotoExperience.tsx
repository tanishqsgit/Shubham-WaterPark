import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { park, features, attractions, photoStory } from "../data/attractions";
import { BookingDialog, Loader, Progress } from "../components/ui/Chrome";
import { FeatureIcon } from "../components/ui/FeatureIcon";
import { Safety, Visit, Footer } from "./JourneySections";
import { useJourney } from "../hooks/useJourney";
import { useParkStore } from "../store/useParkStore";
import "../photo.css";

type Photo = { src: string; alt: string; label: string };
const allPhotos = [
  ...photoStory.heroPhotos,
  ...photoStory.attractionPhotos,
  ...photoStory.gallery,
];
function PhotoViewer({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (photo) {
      setIndex(allPhotos.findIndex((p) => p.src === photo.src));
      dialog.current?.showModal();
    } else dialog.current?.close();
  }, [photo]);
  const current = allPhotos[index] ?? allPhotos[0];
  const change = (direction: number) =>
    setIndex((i) => (i + direction + allPhotos.length) % allPhotos.length);
  return (
    <dialog
      className="photo-viewer"
      ref={dialog}
      onCancel={onClose}
      aria-label={current.label}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") change(1);
        if (e.key === "ArrowLeft") change(-1);
      }}
    >
      <button
        className="photo-viewer-close"
        onClick={onClose}
        aria-label={photoStory.closePhoto}
      >
        ×
      </button>
      {photo && <img src={current.src} alt={current.alt} />}
      <div className="photo-viewer-caption">
        <button
          onClick={() => change(-1)}
          aria-label={photoStory.previousPhoto}
        >
          ←
        </button>
        <span>
          {current.label}
          <small>
            {photoStory.photoCredit} · {String(index + 1).padStart(2, "0")} /{" "}
            {allPhotos.length}
          </small>
        </span>
        <button onClick={() => change(1)} aria-label={photoStory.nextPhoto}>
          →
        </button>
      </div>
    </dialog>
  );
}
export default function PhotoExperience() {
  const [booking, setBooking] = useState(false),
    [selected, setSelected] = useState<Photo | null>(null),
    [active, setActive] = useState(0),
    [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const progress = useParkStore((s) => s.progress),
    reduced = useParkStore((s) => s.reduced);
  useJourney();
  const still = reduced || paused;
  useEffect(() => {
    if (still) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".photo-hero-media",
        { yPercent: 0 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ".photo-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.to(".photo-hero-heading", {
        y: 90,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".photo-hero",
          start: "30% top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".photo-parallax").forEach((el) =>
        gsap.fromTo(
          el,
          { yPercent: -7, scale: 1.15 },
          {
            yPercent: 7,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>(".photo-panel").forEach((el, i) =>
        gsap.fromTo(
          el,
          { rotateZ: i % 2 ? 2 : -2, rotateY: i % 2 ? -7 : 7 },
          {
            rotateZ: 0,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          },
        ),
      );
      gsap.fromTo(
        ".photo-intro .floating-photo",
        { y: 45, rotation: 8 },
        {
          y: -30,
          rotation: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ".photo-intro",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, root);
    return () => context.revert();
  }, [still]);
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  const onBook = () => {
    if (park.bookingUrl) window.location.assign(park.bookingUrl);
    else setBooking(true);
  };
  return (
    <div
      className="photo-experience"
      ref={root}
      data-scrolled={progress > 0.015}
      data-still={still}
    >
      <a className="skip-link" href="#why-visit">
        {park.ui.skip}
      </a>
      <Loader />
      <header className="photo-header">
        <a
          className="photo-brand"
          href="#home"
          aria-label={`${park.name} home`}
        >
          <img src="/images/logo.png" alt="Shubham Water World official logo" />
          <span>
            shubham<small>WATER PARK · NASHIK</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#why-visit">{park.ui.about}</a>
          <a href="#adrenaline">{park.ui.attractions}</a>
          <a href="#gallery">{photoStory.galleryNav}</a>
          <a href="#visit">{park.ui.visit}</a>
        </nav>
        <button className="button button-yellow" onClick={onBook}>
          {park.ui.book}
          <span aria-hidden="true">↗</span>
        </button>
      </header>
      <main>
        <section className="photo-hero" id="home" data-section>
          <div className="photo-hero-media">
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={photoStory.heroPhotos[active].src}
                alt={photoStory.heroPhotos[active].alt}
                fetchPriority="high"
                onLoad={() => useParkStore.getState().set({ loading: false })}
                onError={() => useParkStore.getState().set({ loading: false })}
                initial={{ opacity: 0, scale: still ? 1 : 1.09 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: still ? 0 : 0.8 },
                  scale: { duration: still ? 0 : 2.4, ease: "easeOut" },
                }}
              />
            </AnimatePresence>
          </div>
          <div className="photo-hero-shade" />
          <div className="photo-hero-content">
            <div className="photo-open">
              <i />
              {park.banner}
            </div>
            <p className="eyebrow">{photoStory.kicker}</p>
            <div className="photo-hero-heading">
              <h1
                aria-label={`${park.name}. ${photoStory.heroTitle.join(" ")}`}
              >
                {photoStory.heroTitle[0]}
                <br />
                <em>{photoStory.heroTitle[1]}</em>
                <span className="hero-asterisk" aria-hidden="true">
                  ✳
                </span>
              </h1>
              <p>{photoStory.heroDescription}</p>
              <div className="photo-hero-actions">
                <button className="button button-yellow" onClick={onBook}>
                  {photoStory.heroCta}
                  <span>↗</span>
                </button>
                <a href="#gallery">
                  {photoStory.galleryCta}
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
          <div className="photo-hero-bottom">
            <a href="#why-visit" className="photo-scroll">
              <span>↓</span>
              {park.ui.scroll}
            </a>
            <div
              className="hero-image-picker"
              aria-label={photoStory.choosePhoto}
            >
              {photoStory.heroPhotos.map((p, i) => (
                <button
                  key={p.src}
                  aria-label={`${photoStory.showPhoto}: ${p.label}`}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <img src={p.src} alt="" />
                  <span>0{i + 1}</span>
                </button>
              ))}
            </div>
            <span className="hero-place">
              NASHIK, INDIA <i>↗</i>
            </span>
          </div>
          <div className="hero-side-label">{photoStory.sideLabel}</div>
        </section>
        <div className="photo-ticker" aria-label={photoStory.marquee}>
          <div aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                {photoStory.marquee}
                <b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <section id="why-visit" data-section className="photo-intro">
          <div className="photo-intro-grid">
            <div className="intro-copy reveal">
              <p className="eyebrow">{photoStory.chapter}</p>
              <h2>{photoStory.introTitle}</h2>
              <p>{photoStory.introText}</p>
              <a href="#adrenaline" className="photo-underlined">
                {park.explore}
                <span>↗</span>
              </a>
            </div>
            <div className="photo-collage">
              <button
                className="collage-main"
                onClick={() => setSelected(photoStory.gallery[0])}
                aria-label={`${photoStory.viewPhoto}: ${photoStory.gallery[0].label}`}
              >
                <img
                  className="photo-parallax"
                  src={photoStory.gallery[0].src}
                  alt={photoStory.gallery[0].alt}
                  loading="lazy"
                />
              </button>
              <button
                className="floating-photo"
                onClick={() => setSelected(photoStory.heroPhotos[1])}
                aria-label={`${photoStory.viewPhoto}: ${photoStory.heroPhotos[1].label}`}
              >
                <img
                  src={photoStory.heroPhotos[1].src}
                  alt={photoStory.heroPhotos[1].alt}
                  loading="lazy"
                />
                <span>{photoStory.collageCaption} ↗</span>
              </button>
              <div className="photo-sun-sticker" aria-hidden="true">
                ☀
                <span>
                  100%<small>GOOD TIMES</small>
                </span>
              </div>
            </div>
          </div>
          <div className="photo-features">
            {features.map((f, i) => (
              <article className="reveal" key={f.title}>
                <span className="feature-index">0{i + 1}</span>
                <FeatureIcon type={f.icon} />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="photo-chapter-title reveal">
          <p className="eyebrow">{park.attractionsKicker}</p>
          <h2>{park.attractionsTitle}</h2>
          <p>{photoStory.attractionIntro}</p>
        </div>
        <div className="photo-attractions">
          {attractions.map((a, i) => {
            const photo = photoStory.attractionPhotos[i];
            return (
              <section
                id={a.id}
                data-section
                className={`photo-attraction ${i % 2 ? "reverse" : ""} ${a.id === "black-hole" ? "photo-night" : ""}`}
                key={a.id}
                style={{ "--accent": a.color } as React.CSSProperties}
              >
                <button
                  className="photo-panel"
                  aria-label={`${photoStory.viewPhoto}: ${photo.label}`}
                  onClick={() => setSelected(photo)}
                >
                  <img
                    className="photo-parallax"
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />
                  <span className="photo-panel-count">
                    0{i + 1}
                    <small>/ 08</small>
                  </span>
                  <span className="photo-panel-label">
                    {photoStory.photoCredit} — {photo.label}
                  </span>
                  <span className="photo-expand" aria-hidden="true">
                    ↗
                  </span>
                </button>
                <article className="photo-attraction-copy reveal">
                  <p className="eyebrow">
                    <span /> {a.label}
                  </p>
                  <h2>{a.name}</h2>
                  <p className="photo-tagline">{a.tagline}</p>
                  <p>{a.description}</p>
                  <div className="photo-tags">
                    <span>{a.kind}</span>
                    <span>↟ {a.height}</span>
                  </div>
                  <details>
                    <summary>
                      {park.ui.safetyLabel}
                      <span>+</span>
                    </summary>
                    <p>{a.safety}</p>
                  </details>
                  <a
                    href={`#${attractions[i + 1]?.id ?? "safety"}`}
                    className="photo-underlined"
                  >
                    {photoStory.next}
                    <span>↓</span>
                  </a>
                </article>
              </section>
            );
          })}
        </div>
        <section id="gallery" className="photo-gallery">
          <div className="gallery-heading reveal">
            <div>
              <p className="eyebrow">{photoStory.photoLabel}</p>
              <h2>{photoStory.photoTitle}</h2>
            </div>
            <p>{photoStory.photoText}</p>
          </div>
          <div className="photo-gallery-grid">
            {photoStory.gallery.map((p, i) => (
              <button
                key={p.src}
                className={`gallery-shot gallery-shot-${i} reveal`}
                onClick={() => setSelected(p)}
                aria-label={`${photoStory.viewPhoto}: ${p.label}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                <span>
                  {p.label}
                  <b>↗</b>
                </span>
              </button>
            ))}
          </div>
        </section>
        <Safety />
        <Visit onBook={onBook} />
        <Footer onPlaceholder={onBook} />
      </main>
      <Progress />
      <button
        className="photo-motion-control"
        aria-pressed={paused}
        aria-label={paused ? photoStory.play : photoStory.pause}
        onClick={() => setPaused((p) => !p)}
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        {paused ? photoStory.motionPaused : photoStory.photoMotion}
      </button>
      <BookingDialog open={booking} onClose={() => setBooking(false)} />
      <PhotoViewer photo={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
