export interface Lawyer {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    specialties: string[];
    hourlyRate: number;
    location: string;
    experience: number;
    bio?: string;
  };
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  clientId: string;
  client: {
    profile: {
      firstName: string;
      lastName: string;
      avatar?: string;
    };
  };
  createdAt: Date;
}

export interface Booking {
  id: string;
  date: Date;
  time: string;
  type: 'VIDEO' | 'PHONE' | 'IN_PERSON';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  price: number;
  clientId: string;
  lawyerId: string;
  createdAt: Date;
}

export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  location?: string;
  experience?: number;
  availability?: Date;
}

export interface BookingFormData {
  lawyerId: string;
  date: Date;
  time: string;
  type: 'VIDEO' | 'PHONE' | 'IN_PERSON';
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} 