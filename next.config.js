/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Enable Edge Runtime for API routes
    runtime: 'edge',
  },

  // Image optimization settings
  images: {
    // Disable image optimization since we only serve SVGs
    unoptimized: true,
  },

  // Headers for better caching and CORS
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Specific headers for badge endpoints
        source: '/api/badge/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/badge',
        destination: '/docs/getting-started',
        permanent: true,
      },
      {
        source: '/api',
        destination: '/docs/api-reference',
        permanent: true,
      },
      {
        source: '/themes',
        destination: '/docs/themes',
        permanent: true,
      },
    ];
  },

  // Environment variables
  env: {
    // Add any public environment variables here
  },
};

module.exports = nextConfig;
