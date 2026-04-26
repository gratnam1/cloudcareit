import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  time: number | string;
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
  placeId: 'ChIJuYi__3KoS2cRJ7SkFIWUd-o',
  rating: 5,
  userRatingsTotal: 2,
  googleMapsUrl: 'https://maps.google.com/?cid=16895135826401604647',
  fetchedAt: new Date().toISOString(),
  reviews: [
    {
      authorName: 'iqbal Ahmed',
      rating: 5,
      text: 'Kannan from CrtlShift is very professional and knowledgeable and ended up helping me to establish my office network system. I highly recommend their services.',
      relativeTimeDescription: '2 months ago',
      time: '2026-02-05T02:32:47.755013382Z',
    },
    {
      authorName: 'Mylvaganam Thangavadivel',
      rating: 5,
      text: 'Super easy to work with and very responsive. They know what they are doing and get things done quickly. Definitely recommend CtrlShift IT Services!',
      relativeTimeDescription: 'a week ago',
      time: '2026-04-12T23:37:56.755419749Z',
    },
  ],
  error: 'Google Reviews API is not configured yet; showing verified public Google review fallback.',
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
