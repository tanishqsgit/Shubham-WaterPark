import { park, features, attractions, rules } from "../data/attractions";
import { Arrow } from "../components/ui/Chrome";
import { FeatureIcon } from "../components/ui/FeatureIcon";
import { useParkStore } from "../store/useParkStore";
export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" data-section className="hero">
      <div className="hero-copy">
        <div className="open-badge">
          <span />
          {park.banner}
        </div>
        <p className="eyebrow">
          {park.name} · {park.eyebrow}
        </p>
        <h1 aria-label={`${park.name}. ${park.hero.join(" ")}`}>
          {park.hero[0]}
          <br />
          {park.hero[1]} <em>{park.hero[2]}</em>
          <svg className="splash-mark" viewBox="0 0 70 70" aria-hidden="true">
            <path
              d="m8 45 14-7M33 23l5-16m9 32 16-9"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </h1>
        <p className="hero-description">{park.intro}</p>
        <div className="hero-actions">
          <button className="button button-yellow" onClick={onBook}>
            {park.book}
            <Arrow />
          </button>
          <a className="text-link" href="#adrenaline">
            {park.explore}
            <span>↓</span>
          </a>
        </div>
        <div className="hero-footnote">
          <span className="pin">⌖</span>
          <span>
            {park.location}
            <small>{park.tagline}</small>
          </span>
        </div>
      </div>
      <div className="scene-label">
        <span>✦</span> {park.ui.illustrated}
      </div>
      <div className="floating-sticker">
        <span>☀</span>
        <b>{park.ui.family}</b>
        <small>{park.ui.food}</small>
      </div>
      <a className="scroll-cue" href="#why-visit">
        <span>↓</span>
        {park.ui.scroll}
      </a>
      <div className="hero-bottom">
        <span>{park.name}</span>
        <span>01 / 12</span>
      </div>
    </section>
  );
}
export function Features() {
  return (
    <section id="why-visit" data-section className="features-section">
      <div className="section-heading reveal">
        <p className="eyebrow">{park.featuresKicker}</p>
        <h2>{park.featuresTitle}</h2>
      </div>
      <div className="feature-grid">
        {features.map((f, i) => (
          <article
            className="feature-card reveal"
            key={f.title}
            style={{ "--delay": `${i * 0.12}s` } as React.CSSProperties}
          >
            <FeatureIcon type={f.icon} />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
      <div className="chapter-heading reveal">
        <p className="eyebrow">{park.attractionsKicker}</p>
        <h2>{park.attractionsTitle}</h2>
        <span>↓</span>
      </div>
    </section>
  );
}
export function AttractionSections() {
  const ride = useParkStore((s) => s.ride),
    reduced = useParkStore((s) => s.reduced);
  return (
    <>
      {attractions.map((a, i) => (
        <section
          id={a.id}
          data-section
          className={`attraction-section ${a.id === "black-hole" ? "night-section" : ""}`}
          key={a.id}
          style={{ "--accent": a.color } as React.CSSProperties}
        >
          <article className="attraction-card reveal">
            <div className="attraction-top">
              <span className="chapter-number">0{i + 1}</span>
              <span className="eyebrow">{a.label}</span>
            </div>
            <h2>{a.name}</h2>
            <p className="attraction-tagline">{a.tagline}</p>
            <p>{a.description}</p>
            <div className="ride-tags">
              <span>≈ {a.kind}</span>
              <span>↟ {a.height}</span>
            </div>
            <details>
              <summary>
                {park.ui.safetyLabel}
                <span>+</span>
              </summary>
              <p>{a.safety}</p>
            </details>
            <div className="attraction-actions">
              {!reduced && i < 6 && (
                <button
                  className="button button-dark"
                  aria-pressed={ride}
                  onClick={() => useParkStore.getState().set({ ride: !ride })}
                >
                  {ride ? park.ui.stopRide : park.ui.ride}
                  <span aria-hidden="true">▷</span>
                </button>
              )}
              <a
                href={`#${attractions[i + 1]?.id ?? "safety"}`}
                aria-label={park.ui.next}
              >
                ↓
              </a>
            </div>
          </article>
          <div className="scene-caption">
            <span>✦</span> {a.name}
            <small>{a.kind}</small>
          </div>
        </section>
      ))}
    </>
  );
}
export function Safety() {
  return (
    <section id="safety" data-section className="safety-section">
      <div className="section-heading reveal">
        <p className="eyebrow">{park.ui.safetyLabel}</p>
        <h2>{park.safetyTitle}</h2>
      </div>
      <div className="rules-grid">
        {rules.map((r) => (
          <article className="reveal" key={r.title}>
            <strong>{r.number}</strong>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <p className="rules-note reveal">{park.safetyNote}</p>
    </section>
  );
}
export function Visit({ onBook }: { onBook: () => void }) {
  return (
    <section id="visit" data-section className="visit-section">
      <div className="visit-copy reveal">
        <p className="eyebrow">
          {park.location} · {park.visit}
        </p>
        <h2>{park.visitTitle}</h2>
        <p>{park.visitIntro}</p>
        <div className="visit-hours">
          <span>☀</span>
          <div>
            <small>{park.ui.hours}</small>
            <strong>{park.hours}</strong>
          </div>
        </div>
        <button className="button button-yellow" onClick={onBook}>
          {park.book}
          <Arrow />
        </button>
        <div className="contact-lines">
          <p>{park.address || `${park.location} · ${park.ui.placeholder}`}</p>
          {park.phone && <a href={`tel:${park.phone}`}>{park.phone}</a>}
          {park.whatsapp && (
            <a href={`https://wa.me/${park.whatsapp}`}>WhatsApp</a>
          )}
          {park.email && <a href={`mailto:${park.email}`}>{park.email}</a>}
        </div>
      </div>
      <div className="map-card reveal">
        {park.mapEmbed ? (
          <iframe
            src={park.mapEmbed}
            title={`${park.name} location map`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <>
            <div className="map-roads">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="map-pin">⌖</span>
            <strong>{park.mapLabel}</strong>
            <p>{park.mapNote}</p>
          </>
        )}
      </div>
    </section>
  );
}
export function Footer({ onPlaceholder }: { onPlaceholder: () => void }) {
  return (
    <footer className="footer">
      <div>
        <strong>{park.name}</strong>
        <p>{park.footer}</p>
      </div>
      <div className="socials">
        {park.socials.map((s) =>
          s.url ? (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
              {s.name} ↗
            </a>
          ) : (
            <button
              key={s.name}
              onClick={onPlaceholder}
              disabled
              title={`${s.name}: ${park.ui.placeholder}`}
            >
              {s.name} ↗
            </button>
          ),
        )}
      </div>
      <small>{park.concept}</small>
    </footer>
  );
}
