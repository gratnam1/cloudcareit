import type { Type } from '@angular/core';

export type BlogPostMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt?: string;
  date?: string; // YYYY-MM-DD
  tags?: string[];
  loadComponent?: () => Promise<Type<unknown>>;
};
