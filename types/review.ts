export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    name: string;
  };
}
