export interface ServiceLink {
  label: string;
  route: string;
  fragment?: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  text: string;
  outcome?: string;
}

export interface ServiceStep {
  label?: string;
  title: string;
  text: string;
}

export interface ServiceScenario {
  title: string;
  problem: string;
  fix: string;
  outcome: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceLandingPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: ServiceLink;
  secondaryCta: ServiceLink;
  trustChips: string[];
  heroVisual: {
    title: string;
    metric: string;
    caption: string;
    nodes: string[];
  };
  handleTitle: string;
  handleIntro: string;
  serviceCards: ServiceCard[];
  infographic: {
    eyebrow: string;
    title: string;
    intro: string;
    type: 'roadmap' | 'layers' | 'map' | 'ops' | 'topology' | 'timeline' | 'automation';
    items: ServiceStep[];
  };
  problems: ServiceCard[];
  deliverables: ServiceCard[];
  engagement: ServiceStep[];
  scenario: ServiceScenario;
  faq: ServiceFaq[];
  relatedLinks: ServiceLink[];
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    primary: ServiceLink;
    secondary: ServiceLink;
  };
}
