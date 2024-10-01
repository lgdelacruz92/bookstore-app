import { Book } from "./book";
export interface Books {
  totalBooks: string;
  totalPages: string;
  currentPage: string;
  books: Book[];
}
