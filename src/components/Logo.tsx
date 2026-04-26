import { Link } from 'react-router-dom';

function BrandMark({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Koyu arka plan */}
      <rect width="100" height="100" rx="16" fill="#0B0B0C" />
      
      {/* Sol Süslü Parantez { - Daha kalın ve belirgin */}
      <path 
        d="M 35 30 H 25 C 20 30 20 35 20 40 V 45 C 20 50 25 50 25 50 V 55 C 25 60 20 60 20 65 V 70 C 20 75 20 80 25 80 H 35" 
        fill="none" 
        stroke="#A1A1AA" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Sağ Süslü Parantez } - Simetrik ve kalın */}
      <path 
        d="M 65 30 H 75 C 80 30 80 35 80 40 V 45 C 80 50 75 50 75 50 V 55 C 75 60 80 60 80 65 V 70 C 80 75 80 80 75 80 H 65" 
        fill="none" 
        stroke="#A1A1AA" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Orta Slash / - Markanın teknoloji vurgusu */}
      <line 
        x1="50" y1="30" x2="50" y2="80" 
        stroke="#0066FF" 
        strokeWidth="10" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'sm', className = '' }: LogoProps) {
  const markPx = size === 'sm' ? 32 : size === 'md' ? 40 : 48;
  const namePx = size === 'sm' ? 22 : size === 'md' ? 26 : 32;

  return (
    <Link to="/" className={`group inline-flex items-center gap-4 ${className}`}>
      <div className="shrink-0 transition-all duration-300 group-hover:rotate-3">
        <BrandMark size={markPx} />
      </div>

      <div className="flex flex-col justify-center">
        <span
          style={{ fontSize: namePx }}
          className="font-bold tracking-tight text-secondary leading-none"
        >
          BUTIQ STUDIO
        </span>
        <span
          className="text-xs font-medium tracking-[0.2em] text-[#0066FF] mt-1 uppercase"
        >
          ÖZEL YAZILIM ÇÖZÜMLERİ
        </span>
      </div>
    </Link>
  );
}