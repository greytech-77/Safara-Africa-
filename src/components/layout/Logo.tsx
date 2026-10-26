import Image from 'next/image';
import { site } from '@/config/site';

// Logo artwork: 1688 × 513 px, transparent PNG. Replace with an SVG from the designer when available.
export default function Logo({
  tone = 'navy',
  height = 64,
  priority = false,
}: {
  tone?: 'navy' | 'white';
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round((height * 1688) / 513);
  return (
    <Image
      src={tone === 'white' ? '/images/brand/logo-white.png' : '/images/brand/logo-navy.png'}
      alt={site.legalName}
      width={width}
      height={height}
      priority={priority}
      className="block h-auto max-w-full"
    />
  );
}
