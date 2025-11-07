
export interface Product {
  id: number;
  name: string;
  image: string;
  benefits: string[];
  rating: number;
  reviews: number;
  affiliateLink: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
}
