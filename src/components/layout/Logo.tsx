import Image from 'next/image';
import { site } from '@/config/site';

// Logo artwork: 1256 × 409 px, transparent PNG, cut from "Safara Africa Expeditions Logo (1).png" with the "Africa Expeditions" line enlarged.
// dark: deep teal, for light grounds; white: for photos and the footer.
export default function Logo({
  tone = 'dark',
  height = 64,
  priority = false,
}: {
  tone?: 'dark' | 'white';
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round((height * 1256) / 409);
  return (
    <Image
      src={tone === 'white' ? '/images/brand/safara-logo-white.png' : '/images/brand/safara-logo-teal.png'}
      alt={site.legalName}
      width={width}
      height={height}
      priority={priority}
      className="block h-auto max-w-full"
    />
  );
}
