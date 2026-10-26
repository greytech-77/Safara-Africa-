import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos come from Unsplash. Replace them with your own (in /public) before launch.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },

  // Keep old WordPress URLs working (search rankings + existing links).
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      r('/portfolio/:path*', '/tours'),
      r('/portfolio_group/:path*', '/tours'),
      r('/stacked', '/tours'),
      r('/online-booking', '/contact'),
      r('/the-ultimate-luxury-safari-experience-in-namibia', '/journal'),
      r('/exploring-namibias-desert-wonders-in-style', '/journal'),
      r('/coastal-elegance-whale-watching-and-marine-luxury-in-namibia', '/journal'),
      r('/a-testimonial-of-luxury', '/journal'),
      r('/category/:path*', '/journal'),

      // Park pages moved from /destinations to /parks when /destinations became countries.
      r('/destinations/:park(serengeti|ngorongoro|tarangire|lake-manyara|ruaha)', '/parks/:park'),
      r('/destinations/kilimanjaro', '/trekking/kilimanjaro'),
      r('/destinations/zanzibar', '/beaches/zanzibar'),
    ];
  },
};

export default nextConfig;
