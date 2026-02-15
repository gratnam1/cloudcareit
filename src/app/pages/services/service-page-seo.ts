import { SeoService } from '../../shared/seo/seo.service';

type ServicePageSeoOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  serviceName: string;
  schemaId: string;
  breadcrumbId: string;
};

const BASE_URL = 'https://ctrlshiftit.ca';
const AREA_SERVED = ['Vaughan', 'Toronto', 'Mississauga', 'Thornhill', 'Richmond Hill'];

export function applyServicePageSeo(seo: SeoService, options: ServicePageSeoOptions): void {
  const canonicalUrl = `${BASE_URL}${options.canonicalPath}`;

  seo.update({
    title: options.title,
    description: options.description,
    type: 'website',
    canonicalPath: options.canonicalPath
  });

  seo.setStructuredData(options.schemaId, {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.serviceName,
    serviceType: options.serviceName,
    description: options.description,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: 'CtrlShift IT Services',
      url: BASE_URL
    },
    areaServed: AREA_SERVED.map((city) => ({ '@type': 'City', name: city }))
  });

  seo.setStructuredData(options.breadcrumbId, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: options.serviceName,
        item: canonicalUrl
      }
    ]
  });
}
