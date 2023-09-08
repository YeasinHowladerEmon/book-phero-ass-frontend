export interface IBook {
  _id: number;
  author: string;
  genre: string;
  title: string;
  publicationDate: string;
  userId?: string;
  comment?: string[];
  status?: string;
}
