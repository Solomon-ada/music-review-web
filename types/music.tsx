export interface Music {
  id: number;
  title: string;
  author: string;
  singer: string;
  image: string;
  category: {
    id: number;
    category: string;
  };
}
