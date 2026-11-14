export function WebstudioLogoMark({ dark = false }: { dark?: boolean }) {
  const containerFill = dark ? '#FFFFFF' : '#141416';
  const neutralSquareFill = dark ? '#141416' : '#FFFFFF';
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-500 ease-out group-hover:rotate-90" focusable="false"
    >
      <rect width="28" height="28" rx="8" fill={containerFill} />
      <rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27" />
      <rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill={neutralSquareFill} />
      <rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill={neutralSquareFill} />
      <rect x="15" y="15" width="6.5" height="6.5" rx="2" fill={neutralSquareFill} />
    </svg>
  );
}

export function ActiveNavFlower() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="text-[#141416]"
    >
      <circle cx="6" cy="2" r="1.15" fill="currentColor" />
      <circle cx="9.4" cy="4" r="1.15" fill="currentColor" />
      <circle cx="9.4" cy="8" r="1.15" fill="currentColor" />
      <circle cx="6" cy="10" r="1.15" fill="currentColor" />
      <circle cx="2.6" cy="8" r="1.15" fill="currentColor" />
      <circle cx="2.6" cy="4" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function ShowcaseEmblem() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      className="w-11 h-11 sm:w-13 sm:h-13"
    >
      <rect x="4" y="4" width="44" height="44" rx="12" fill="#141416" stroke="rgba(255,255,255,0.14)" />
      <rect x="13" y="13" width="11.5" height="11.5" rx="3.2" fill="#FB4D27" />
      <rect x="27.5" y="13" width="11.5" height="11.5" rx="3.2" fill="#FFFFFF" />
      <rect x="13" y="27.5" width="11.5" height="11.5" rx="3.2" fill="#FFFFFF" />
      <rect x="27.5" y="27.5" width="11.5" height="11.5" rx="3.2" fill="#D47A3B" />
    </svg>
  );
}

export function PartnerZanticIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1.2" fill="#FB4D27" />
      <rect x="9" y="2" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="2" y="9" width="5" height="5" rx="1.2" fill="currentColor" />
      <rect x="9" y="9" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function PartnerBookStoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14 5.2V10.8L8 14L2 10.8V5.2L8 2Z" fill="currentColor" opacity="0.75" />
      <path d="M8 2L14 5.2L8 8.4L2 5.2L8 2Z" fill="currentColor" />
    </svg>
  );
}

export function PartnerWagerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="4.2" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="11.8" cy="8" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="8" cy="11.8" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="4.2" cy="8" r="2" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function PartnerCronaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.8L10.2 5.8L14.2 8L10.2 10.2L8 14.2L5.8 10.2L1.8 8L5.8 5.8L8 1.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function PartnerMercuryIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path
        d="M1.5 11.5L4.8 3.5L8.2 9.5L11.6 3.5L15.5 11.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
