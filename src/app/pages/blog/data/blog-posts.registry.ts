import type { BlogPostMeta } from './blog.types';

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'post-quantum-small-business',
    title: 'Post-Quantum Security for Small Businesses',
    excerpt: 'What PQC means, what to do now, and how to plan upgrades.',
    date: '2026-02-06',
    tags: ['Security', 'PQC'],
    loadComponent: () =>
      import('../posts/post-quantum-small-business/post-quantum-small-business.component')
        .then(m => m.PostQuantumSmallBusinessComponent),
  },
];
