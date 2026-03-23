/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: "https",
    hostname: "storage.googleapis.com",
  },
  {
    protocol: "https",
    hostname: "img.youtube.com",
  },
  {
    protocol: "https",
    hostname: "i.ytimg.com",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);
    if (hostname) {
      remotePatterns.unshift({
        protocol: "https",
        hostname,
      });
    }
  } catch {
    // Invalid URL; skip Supabase image host
  }
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
