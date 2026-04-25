export const HOME_SCHEMA_IDS = {
  LOCAL_BUSINESS: 'local-business-home',
  OFFER_CATALOG: 'offer-catalog-home',
  FAQ: 'faq-home',
  AGGREGATE_RATING: 'aggregate-rating-home',
  SPEAKABLE: 'speakable-home',
  HOWTO: 'howto-onboarding',
  ORGANIZATION: 'organization-home',
  SERVICE_AREA: 'service-area-home'
};

export const HOME_STRUCTURED_DATA = {
  LOCAL_BUSINESS: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://ctrlshiftit.ca/#localbusiness',
    name: 'CtrlShift IT Services',
    image: 'https://ctrlshiftit.ca/favicon.svg',
    url: 'https://ctrlshiftit.ca/',
    telephone: '+1-416-624-4841',
    email: 'info@ctrlshiftit.ca',
    priceRange: '$$',
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Vaughan',
        addressRegion: 'ON',
        addressCountry: 'CA'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Scarborough',
        addressRegion: 'ON',
        addressCountry: 'CA'
      }
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.8372,
      longitude: -79.5083
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    areaServed: [
      { '@type': 'City', name: 'Vaughan' },
      { '@type': 'City', name: 'Scarborough' },
      { '@type': 'City', name: 'Toronto' },
      { '@type': 'City', name: 'Mississauga' },
      { '@type': 'City', name: 'Thornhill' },
      { '@type': 'City', name: 'Richmond Hill' }
    ],
    sameAs: [
      'https://www.linkedin.com/company/ctrlshiftit-services/',
      'https://x.com/CtrlShiftIt',
      'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
      'https://clutch.co/profile/ctrlshift-it-services',
      'https://www.goodfirms.co/company/ctrlshift-it-services'
    ],
    knowsAbout: [
      'Managed IT services',
      'Cybersecurity',
      'Endpoint detection and response',
      'Network firewall security',
      'Zero-trust remote access',
      'Microsoft 365 administration',
      'Google Workspace administration',
      'AWS cloud infrastructure',
      'Huntress',
      'Fortinet',
      'Tailscale'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Managed IT Services for B2B Professional Offices',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Industries Served',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Law Firms' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Accounting Firms' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support for Medical Clinics' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Core Security Stack',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Huntress AI-assisted endpoint detection' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fortinet network firewall security' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tailscale zero-trust secure access' } }
          ]
        }
      ]
    }
  },
  OFFER_CATALOG: {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': 'https://ctrlshiftit.ca/#managed-it-pricing',
    name: 'Managed IT Support Plans',
    url: 'https://ctrlshiftit.ca/#pricing',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Starter',
        url: 'https://ctrlshiftit.ca/#pricing',
        category: 'Managed IT Support Plan',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '249',
          priceCurrency: 'CAD',
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON'
        },
        itemOffered: {
          '@type': 'Service',
          name: 'Starter Managed IT Support',
          description: '2 support hours per month, basic maintenance. Does not include 24/7 monitoring, endpoint protection, backup monitoring, network monitoring, priority response, or 30-day risk-free trial.'
        }
      },
      {
        '@type': 'Offer',
        name: 'Growth',
        url: 'https://ctrlshiftit.ca/#pricing',
        category: 'Managed IT Support Plan',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '499',
          priceCurrency: 'CAD',
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON'
        },
        itemOffered: {
          '@type': 'Service',
          name: 'Growth Managed IT Support',
          description: '5 support hours per month, 24/7 monitoring, endpoint protection, backup monitoring, patch management, Microsoft 365 support, network monitoring, priority response under 15 minutes, quarterly vulnerability scan, and 30-day risk-free trial.'
        }
      },
      {
        '@type': 'Offer',
        name: 'Business',
        url: 'https://ctrlshiftit.ca/#pricing',
        category: 'Managed IT Support Plan',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '899',
          priceCurrency: 'CAD',
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON'
        },
        itemOffered: {
          '@type': 'Service',
          name: 'Business Managed IT Support',
          description: '10 support hours per month, full IT department outsourcing, 24/7 monitoring, endpoint protection, backup monitoring, patch management, Microsoft 365 support, network monitoring, priority response under 15 minutes, quarterly vulnerability scan, hardware procurement, vendor management, and 30-day risk-free trial.'
        }
      }
    ]
  },
  FAQ: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://ctrlshiftit.ca/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the 30-Day Guarantee work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For the Growth or Business plan, if the first 30 days do not deliver a clear stability improvement, you can cancel with no penalty. You get transparent monthly pricing, no hidden fees, and no surprise invoices.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you take over from our current IT provider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We run a structured transition covering credentials, tenant access, asset inventory, backup validation, and support handoff. The goal is a clean takeover with minimal disruption to your staff.'
        }
      },
      {
        '@type': 'Question',
        name: 'How fast do you respond when something breaks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Urgent production-impact incidents are triaged immediately, with remote-first response and on-site escalation when required. Growth and Business clients receive response within 15 minutes.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does managed IT support cost in Vaughan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CtrlShift IT Services offers three flat-rate plans: Starter at $249/month with 2 support hours, Growth at $499/month with 5 hours and priority response, and Business at $899/month with 10 hours and full IT department outsourcing. All pricing is transparent with no hidden fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'What cities do you provide IT support in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide managed IT services across the Greater Toronto Area: Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill. Our technicians offer both remote support and on-site visits throughout York Region, Peel Region, and the downtown Toronto core.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you support both Google Workspace and Microsoft 365?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We are certified administrators for both platforms. We manage user accounts, email security, shared drive permissions, data retention policies, and device access controls for Google Workspace and Microsoft 365 environments.'
        }
      },
      {
        '@type': 'Question',
        name: 'What cybersecurity tools do you use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We deploy Huntress for AI-assisted endpoint detection with managed analyst response, Tailscale for zero-trust network access, and enforce multi-factor authentication, conditional access policies, and regular vulnerability scanning across all managed endpoints.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the onboarding process work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our onboarding follows four steps: First, we audit your current IT environment including credentials, devices, and network. Second, we secure accounts with MFA and access policies. Third, we configure monitoring, backups, and patching. Fourth, we hand off documentation and train your team on the helpdesk workflow. Most onboardings complete within 5 business days.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you support law firms, medical clinics, and accounting firms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We have dedicated expertise in regulated industries. For law firms we handle Law Society compliance and confidentiality requirements. For medical clinics we support PHIPA-compliant infrastructure. For accounting firms we ensure CRA-compliant data handling and encryption standards.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are your IT services compliant with Canadian privacy laws?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All our managed IT services are designed to support PIPEDA compliance. We implement data retention policies, encrypted backups, access controls, and audit trails. For medical clinics and legal offices, we apply additional safeguards aligned with provincial health information and professional conduct requirements.'
        }
      }
    ]
  },
  SPEAKABLE: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Managed IT Services & Cloud Support | CtrlShift IT Services',
    url: 'https://ctrlshiftit.ca/',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#speakable-about', '#faq .faq-content']
    }
  },
  HOWTO: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Onboard with CtrlShift IT Services Managed IT',
    description: 'The CtrlShift IT Services onboarding process for new managed IT clients in the Greater Toronto Area takes approximately 5 business days.',
    totalTime: 'P5D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'IT Environment Audit',
        text: 'We audit your current IT environment including credentials, devices, network topology, and existing service agreements.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Security Hardening',
        text: 'We secure all accounts with multi-factor authentication, configure conditional access policies, and remove unauthorized access.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Monitoring & Backup Setup',
        text: 'We configure endpoint monitoring, automated patching, backup schedules, and restore testing for all critical systems.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Documentation & Handoff',
        text: 'We deliver complete IT documentation and train your team on the helpdesk workflow for ongoing support requests.'
      }
    ]
  },
  ORGANIZATION: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://ctrlshiftit.ca/#organization',
    name: 'CtrlShift IT Services',
    url: 'https://ctrlshiftit.ca',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ctrlshiftit.ca/favicon.svg',
      caption: 'CtrlShift IT Services logo'
    },
    telephone: '+1-416-624-4841',
    email: 'info@ctrlshiftit.ca',
    description: 'CtrlShift IT Services is a managed IT provider serving Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill businesses with proactive IT support, cybersecurity, and cloud services.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Vaughan, Ontario, Canada'
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Vaughan',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Toronto',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Greater Toronto Area, Ontario, Canada' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Mississauga',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Peel Region, Ontario, Canada' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Thornhill',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Richmond Hill',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'York Region, Ontario, Canada' }
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/ctrlshiftit-services/',
      'https://x.com/CtrlShiftIt',
      'https://maps.app.goo.gl/AHmLpmKhG88S54d37',
      'https://clutch.co/profile/ctrlshift-it-services',
      'https://www.goodfirms.co/company/ctrlshift-it-services'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Managed IT Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed IT Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Microsoft 365 Administration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Workspace Administration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud & AWS Infrastructure' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Networking & Wi-Fi' } }
      ]
    }
  },
  SERVICE_AREA: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://ctrlshiftit.ca/#managed-it-service',
    name: 'Managed IT Services',
    serviceType: 'Managed IT Services',
    description: 'Proactive managed IT support, cybersecurity, and cloud services for businesses in Vaughan, Toronto, Mississauga, Thornhill, and Richmond Hill.',
    url: 'https://ctrlshiftit.ca/managed-it-services',
    provider: {
      '@type': 'Organization',
      '@id': 'https://ctrlshiftit.ca/#organization',
      name: 'CtrlShift IT Services'
    },
    areaServed: [
      { '@type': 'City', name: 'Vaughan', containedInPlace: { '@type': 'State', name: 'Ontario' } },
      { '@type': 'City', name: 'Toronto', containedInPlace: { '@type': 'State', name: 'Ontario' } },
      { '@type': 'City', name: 'Mississauga', containedInPlace: { '@type': 'State', name: 'Ontario' } },
      { '@type': 'City', name: 'Thornhill', containedInPlace: { '@type': 'State', name: 'Ontario' } },
      { '@type': 'City', name: 'Richmond Hill', containedInPlace: { '@type': 'State', name: 'Ontario' } }
    ]
  }
};
