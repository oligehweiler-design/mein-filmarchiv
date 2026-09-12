interface AppLogoProps {
  className?: string;
}

/**
 * App-Icon: Auge + Filmstreifen (Variante 3).
 */
export default function AppLogo({ className = 'w-8 h-8' }: AppLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="10" width="44" height="28" rx="6" fill="#111827" />
      <rect x="6" y="14" width="4" height="4" rx="1" fill="#c4f542" />
      <rect x="6" y="22" width="4" height="4" rx="1" fill="#c4f542" />
      <rect x="6" y="30" width="4" height="4" rx="1" fill="#c4f542" />
      <rect x="38" y="14" width="4" height="4" rx="1" fill="#c4f542" />
      <rect x="38" y="22" width="4" height="4" rx="1" fill="#c4f542" />
      <rect x="38" y="30" width="4" height="4" rx="1" fill="#c4f542" />
      <path
        d="M14 24c4-6 16-6 20 0-4 6-16 6-20 0z"
        stroke="#c4f542"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3.5" fill="#c4f542" />
    </svg>
  );
}
