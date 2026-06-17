export enum SportType {
  Basketball = 'Basketball',
  Soccer = 'Soccer',
  Tennis = 'Tennis',
  Badminton = 'Badminton',
  Baseball = 'Baseball',
  Volleyball = 'Volleyball',
  Pickleball = 'Pickleball',
  American_Football = 'American Football',
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  sports: SportType[];
  amenities: string[];
  images: string[];
  rating: number;
  reviews: number;
  pricePerHour?: number;
  activePlayers: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocationFilters {
  sport?: SportType;
  search?: string;
  maxDistance?: number;
  minRating?: number;
}
