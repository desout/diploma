import {Ingredient} from './Ingredient';

export interface Dish {
  idDish: number;
  name: string;
  idPhoto?: number;
  description: string;
  prepareTime?: number;
  Categories_idCategory?: number;
  isIncluded?: boolean;
  cost?: number;
  ingredients?: Ingredient[];
  photo?: Blob | File;
}
