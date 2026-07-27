import React from 'react';
import { Helmet } from 'react-helmet-async';
import { profile } from '../../data/profile';

const SITE_URL = 'https://portfolio-sricode.vercel.app';

export const SEO = ({
  title = `${profile.name} — Frontend & Full Stack Developer | UI/UX Designer`,
  description = profile.tagline,
  image = '/og-image.png',
  url = SITE_URL,
}) => {
  const schemaPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.tagline,
    url: url,
    telephone: profile.phone,
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.leetcode,
      profile.links.hackerrank,
      profile.links.instagram,
      profile.links.figma,
      profile.links.tableau,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mayiladuthurai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'India',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'A.V.C. College of Engineering',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'A.V.C. College (Autonomous)',
      },
    ],
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#050816" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org Person Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaPerson)}
      </script>
    </Helmet>
  );
};
