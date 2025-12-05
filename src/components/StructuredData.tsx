export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealProduct',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Professional custom application development services. We build web applications, mobile apps (hybrid & native), and desktop software.',
    sameAs: [
      // Add your social media links here
      // 'https://www.linkedin.com/company/realproduct',
      // 'https://twitter.com/realproduct',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@realproduct.dev',
      url: `${baseUrl}/contact`,
    },
    email: 'info@realproduct.dev',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Application Development',
    provider: {
      '@type': 'Organization',
      name: 'RealProduct',
    },
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}/contact`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Modern, responsive web applications built with cutting-edge technologies.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Development',
            description: 'Native and hybrid mobile applications for iOS and Android.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desktop Applications',
            description: 'Cross-platform desktop software solutions.',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

