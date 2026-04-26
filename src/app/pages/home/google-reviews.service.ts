import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

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

const LEGACY_REVIEWS_ENDPOINT = 'https://cloudcareit.kannnan24.workers.dev/api/google-reviews';

const FALLBACK_RESPONSE: GoogleReviewsResponse = {
  source: 'fallback',
  configured: false,
  placeName: 'CtrlShift IT Services',
  placeId: 'ChIJuYi__3KoS2cRJ7SkFIWUd-o',
  rating: 5,
  userRatingsTotal: 0,
  googleMapsUrl: 'https://maps.google.com/?cid=16895135826401604647',
  fetchedAt: new Date().toISOString(),
  reviews: [],
  error: 'Google Reviews API is not configured yet.',
};

@Injectable({ providedIn: 'root' })
export class GoogleReviewsService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<GoogleReviewsResponse> {
    return this.http.get<GoogleReviewsResponse>('/api/google-reviews').pipe(
      map((response) => this.normalizeResponse(response)),
      switchMap((response) => {
        if (!this.shouldLoadLegacyReviews(response)) {
          return of(response);
        }

        return this.http.get<GoogleReviewsResponse>(LEGACY_REVIEWS_ENDPOINT).pipe(
          map((legacyResponse) => this.normalizeResponse(legacyResponse)),
          catchError((error) => {
            console.error('Unable to load legacy Google reviews fallback:', error);
            return of(response);
          }),
        );
      }),
      catchError((error) => {
        console.error('Unable to load Google reviews:', error);
        return this.http.get<GoogleReviewsResponse>(LEGACY_REVIEWS_ENDPOINT).pipe(
          map((legacyResponse) => this.normalizeResponse(legacyResponse)),
          catchError((legacyError) => {
            console.error('Unable to load legacy Google reviews fallback:', legacyError);
            return of(this.fallbackResponse('Unable to load live Google reviews.'));
          }),
        );
      }),
    );
  }

  private normalizeResponse(response: GoogleReviewsResponse): GoogleReviewsResponse {
    const placeName = response.placeName?.trim() || FALLBACK_RESPONSE.placeName;
    const reviews = Array.isArray(response.reviews) ? response.reviews : [];

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

  private shouldLoadLegacyReviews(response: GoogleReviewsResponse): boolean {
    return !response.configured && response.reviews.length === 0;
  }

  private fallbackResponse(errorMessage: string): GoogleReviewsResponse {
    return {
      ...FALLBACK_RESPONSE,
      fetchedAt: new Date().toISOString(),
      error: errorMessage,
    };
  }
}
