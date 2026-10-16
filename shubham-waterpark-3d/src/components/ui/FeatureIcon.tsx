export function FeatureIcon({ type }: { type: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`feature-icon ${type}`}
    >
      {type === "food" && (
        <>
          <path d="M15 30h35l-4 22H19Z" fill="#f5b03e" />
          <path d="M12 30h41v6H12Z" fill="#fff3c7" />
          <path
            d="m23 9 4 20M35 7v22M47 11l-5 18"
            stroke="#ffcf58"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path d="M26 39h12v7H26Z" fill="#fff1b9" />
        </>
      )}
      {type === "ticket" && (
        <>
          <path d="m10 23 39-9 7 29-39 9-3-11c8-2 6-10-2-9Z" fill="#fc8677" />
          <path
            d="m39 18 6 28"
            stroke="#ffdbb2"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path
            d="m25 28 3 4 5-1-2 4 2 5-5-1-3 3v-5l-4-3 5-1Z"
            fill="#fff5cf"
          />
        </>
      )}
      {type === "tube" && (
        <>
          <ellipse cx="32" cy="37" rx="24" ry="16" fill="#087e9d" />
          <ellipse cx="32" cy="31" rx="24" ry="16" fill="#70d2d7" />
          <ellipse cx="32" cy="30" rx="11" ry="7" fill="#e7faf5" />
          <path
            d="m13 21 8 7m25-7-7 7M12 39l10-5m29 5-10-5"
            stroke="#fff4d6"
            strokeWidth="8"
          />
        </>
      )}
      {type === "locker" && (
        <>
          <path d="M15 12h34v44H15Z" fill="#8e9bd6" />
          <path d="M15 12 24 7h29v44l-4 5V12Z" fill="#a9b9e5" />
          <path d="M21 18h22v31H21Z" fill="#b7c9ef" />
          <path d="M28 22h9m-9 4h9" stroke="#6c82ba" strokeWidth="2" />
          <rect x="37" y="32" width="3" height="9" rx="1" fill="#f9d569" />
        </>
      )}
    </svg>
  );
}
