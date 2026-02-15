import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  time: number;
  profilePhotoUrl?: string;
}

export interface GoogleReviewsResponse {
  source: 'google' | 'fallback';
  configured: boolean;
  placeName: string;
  placeId: string;
  rating: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  fetchedAt: string;
  reviews: GoogleReview[];
  error?: string;
}

const FALLBACK_RESPONSE: GoogleReviewsResponse = {
  source: 'fallback',
  configured: false,
  placeName: 'CtrlShift IT Services',
  placeId: '',
  rating: 5,
  userRatingsTotal: 3,
  googleMapsUrl: 'https://www.google.com/search?q=CtrlShift+IT+Services+reviews',
  fetchedAt: new Date().toISOString(),
  reviews: [
    {
      authorName: 'Toronto Law Office',
      rating: 5,
      text: 'Professional and knowledgeable team. They resolved our server incident quickly and documented every step clearly.',
      relativeTimeDescription: 'recently',
      time: Math.floor(Date.now() / 1000),
    },
    {
      authorName: 'Vaughan Accounting Practice',
      rating: 5,
      text: 'Excellent Microsoft 365 and endpoint rollout. Migration was organized, downtime was minimal, and staff adoption was smooth.',
      relativeTimeDescription: 'recently',
      time: Math.floor(Date.now() / 1000),
    },
    {
      authorName: 'GTA Medical Clinic',
      rating: 5,
      text: 'Reliable support and practical security guidance. Their team improved our backup confidence and daily IT stability.',
      relativeTimeDescription: 'recently',
      time: Math.floor(Date.now() / 1000),
    },
  ],
  error: 'Google Reviews API is not configured yet.',
};

@Injectable({ providedIn: 'root' })
export class GoogleReviewsService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<GoogleReviewsResponse> {
    return this.http.get<GoogleReviewsResponse>('/api/google-reviews').pipe(
      map((response) => this.normalizeResponse(response)),
      catchError((error) => {
        console.error('Unable to load Google reviews:', error);
        return of(this.fallbackResponse('Unable to load live Google reviews.'));
      }),
    );
  }

  private normalizeResponse(response: GoogleReviewsResponse): GoogleReviewsResponse {
    const placeName = response.placeName?.trim() || FALLBACK_RESPONSE.placeName;
    const hasLiveReviews = Array.isArray(response.reviews) && response.reviews.length > 0;
    const shouldUseFallbackReviews = !response.configured && !hasLiveReviews;
    const reviews = shouldUseFallbackReviews
      ? FALLBACK_RESPONSE.reviews
      : (response.reviews ?? []);

    return {
      ...FALLBACK_RESPONSE,
      ...response,
      placeName,
      reviews,
      rating: Number.isFinite(response.rating) ? response.rating : FALLBACK_RESPONSE.rating,
      userRatingsTotal: Number.isFinite(response.userRatingsTotal)
        ? response.userRatingsTotal
        : reviews.length,
      googleMapsUrl: response.googleMapsUrl?.trim() || FALLBACK_RESPONSE.googleMapsUrl,
      fetchedAt: response.fetchedAt || new Date().toISOString(),
      error: response.error ? response.error : undefined,
    };
  }

  private fallbackResponse(errorMessage: string): GoogleReviewsResponse {
    return {
      ...FALLBACK_RESPONSE,
      fetchedAt: new Date().toISOString(),
      error: errorMessage,
    };
  }
}
