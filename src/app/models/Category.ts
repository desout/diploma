export interface Category {
  idCategory: number;
  name: string;
  idPhoto?: number;
  description: string;
  photo?: File | Blob;
}
