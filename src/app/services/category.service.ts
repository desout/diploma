import {Injectable} from '@angular/core';
import {Category} from '../models/Category';
import {HttpClient} from '@angular/common/http';
import {pathConfig} from '../configs/urlConfigs';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ImageService} from './image.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  public getAllCategoriesDishes = (): Observable<Category[]> =>
    this.http.get<Category[]>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}`);

  public getCategory = (id: number): Observable<Category> =>
    this.http.get<Category>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}/${id}`);

  public addCategory = (category: Category): Observable<Category> =>
    category.photo ? this.addCategoryWithPhoto(category) : this.addCategoryWithoutPhoto(category);

  public addCategoryWithPhoto = (category: Category): Observable<Category> =>
    this.imageService.addImage(category.photo as File).pipe(
      switchMap(res => {
        delete category.photo;
        category.idPhoto = res.id;
        return this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}`, category)
          .pipe(switchMap(res1 => this.getCategory(res1.id)));

      })
    );

  public addCategoryWithoutPhoto = (category: Category): Observable<Category> => {
    if (category.idPhoto === -1) {
      category.idPhoto = null;
    }
    return this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}`, category)
      .pipe(switchMap(res1 => this.getCategory(res1.id)));
  };

  saveCategory = (category: Category): Observable<Category> =>
    category.photo ? this.saveCategoryWithPhoto(category) : this.saveCategoryWithoutPhoto(category);

  public saveCategoryWithPhoto = (category: Category): Observable<Category> =>
    this.imageService.addImage(category.photo as File).pipe(
      switchMap(res => {
        console.log(category.photo);
        delete category.photo;
        category.idPhoto = res.id;
        return this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}/${category.idCategory}`, category)
          .pipe(switchMap(res1 => this.getCategory(res1.id)));

      })
    );

  public saveCategoryWithoutPhoto = (category: Category): Observable<Category> => {
    if (category.idPhoto === -1) {
      category.idPhoto = null;
    }
    return this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}/${category.idCategory}`, category)
      .pipe(switchMap(res1 => this.getCategory(res1.id)));
  };
}

