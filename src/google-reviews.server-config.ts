import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const DEFAULT_PLACE_NAME = 'CtrlShift IT Services';
export const DEFAULT_REVIEWS_URL =
  'https://www.google.com/search?q=CtrlShift+IT+Services+reviews';

const LOCAL_ENV_FILENAME = '.env.local';

export type GoogleReviewsServerConfig = {
  apiKey?: string;
  placeId?: string;
  searchQuery?: string;
  reviewPageUrl?: string;
  expectedPlaceName?: string;
};

function parseEnvFile(content: string): Record<string, string> {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .reduce<Record<string, string>>((acc, line) => {
      const separatorIndex = line.indexOf('=');
      if (separatorIndex <= 0) return acc;

      const key = line.slice(0, separatorIndex).trim();
      if (!key) return acc;

      const rawValue = line.slice(separatorIndex + 1).trim();
      const unquoted = rawValue.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      acc[key] = unquoted;
      return acc;
    }, {});
}

function readLocalEnvFile(): Record<string, string> {
  try {
    const envPath = join(process.cwd(), LOCAL_ENV_FILENAME);
    if (!existsSync(envPath)) return {};
    const content = readFileSync(envPath, 'utf8');
    return parseEnvFile(content);
  } catch {
    return {};
  }
}

const localEnv = readLocalEnvFile();

function readConfigVar(name: string): string | undefined {
  const processValue = process.env[name]?.trim();
  if (processValue) return processValue;

  const fileValue = localEnv[name]?.trim();
  return fileValue || undefined;
}

function readFirst(names: string[]): string | undefined {
  for (const name of names) {
    const value = readConfigVar(name);
    if (value) return value;
  }
  return undefined;
}

export function loadGoogleReviewsServerConfig(): GoogleReviewsServerConfig {
  return {
    apiKey: readFirst(['GOOGLE_PLACES_API_KEY', 'GOOGLE_MAPS_API_KEY']),
    placeId: readFirst(['GOOGLE_PLACE_ID', 'GOOGLE_BUSINESS_PLACE_ID']),
    searchQuery: readConfigVar('GOOGLE_PLACE_SEARCH_QUERY'),
    reviewPageUrl: readConfigVar('GOOGLE_REVIEW_PAGE_URL'),
    expectedPlaceName: readConfigVar('GOOGLE_EXPECTED_PLACE_NAME'),
  };
}
