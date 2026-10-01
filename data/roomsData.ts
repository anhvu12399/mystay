import initialData from './rooms.json';

export interface Room {
  id: number;
  title: string;
  subtitle: string;
  beds: string;
  size: string;
  price: string;
  originalPrice?: string;
  usdPrice?: string;
  isContactPrice?: boolean;
  seasonPeriod?: string;
  peakPeriod?: string;
  videoUrl?: string;
  image: string;
  images: string[];
  features: string[];
  amenities: {
    kitchen?: string[];
    bathroom?: string[];
    view?: string[];
    facilities?: string[];
  };
  maxPersons: number;
  badge?: string;
}

export interface SeasonalBannerConfig {
  enabled: boolean;
  title: string;
  seasonPeriod: string;
  seasonRatesNote: string;
  peakPeriod: string;
  peakNotice: string;
  buttonText: string;
  buttonLink: string;
}

export interface AppData {
  seasonalBanner: SeasonalBannerConfig;
  rooms: Room[];
}

export const defaultRoomsData: AppData = initialData as AppData;
