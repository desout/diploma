import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {pathConfig} from '../configs/urlConfigs';
import {HttpClient} from '@angular/common/http';
import {Dish} from '../models/Dish';
import {concatAll, flatMap, map, switchMap, tap, toArray} from 'rxjs/operators';
import {IngredientService} from './ingredient.service';
import {ImageService} from './image.service';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private http: HttpClient, private ingredientService: IngredientService, private imageService: ImageService) {
  }

  public getCategoryDishes = (id: number): Observable<Dish[]> =>
    this.http.get<Dish[]>(`${pathConfig.baseUrl}${pathConfig.categoryAPI}/${id}/dishes`);

  public getCategoryMenuDishes = (idDepartment: number, idCategory: number): Observable<Dish[]> =>
    this.http.get<Dish[]>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}/${idDepartment}/${idCategory}/dishes`)
      .pipe(map(dishes => dishes.filter(dish => dish.isIncluded)));

  public getAllDishes = (): Observable<Dish[]> =>
    this.http.get<Dish[]>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}`);

  public getAllDishesIngredients = (): Observable<Dish[]> =>
    this.getAllDishes().pipe(
      flatMap(res => res.map(
        dish => this.ingredientService.getIngredientsByDish(dish.idDish).pipe(map(ingredientsRes =>
          ({
            ...dish, ingredients: ingredientsRes
          })
        )))),
      concatAll(),
      toArray()).pipe(tap(console.log));

  public getDish = (id: number): Observable<Dish> =>
    this.http.get<Dish>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}/${id}`);

  public addDish = (dish: Dish): Observable<Dish> =>
    dish.photo ? this.addDishWithPhoto(dish) : this.addDishWithoutPhoto(dish);

  public addDishWithPhoto = (dish: Dish): Observable<Dish> =>
    this.imageService.addImage(dish.photo as File).pipe(
      switchMap(res => {
        delete dish.photo;
        dish.idPhoto = res.id;
        return this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}`, dish)
          .pipe(switchMap(res1 => this.getDish(res1.id)));

      })
    );

  public addDishWithoutPhoto = (dish: Dish): Observable<Dish> => {
    if (dish.idPhoto === -1) {
      dish.idPhoto = null;
    }
    return this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}`, dish)
      .pipe(switchMap(res1 => this.getDish(res1.id)));
  };

  public saveDish = (dish: Dish): Observable<Dish> =>
    dish.photo ? this.saveDishWithPhoto(dish) : this.saveDishWithoutPhoto(dish);

  public saveDishWithPhoto = (dish: Dish): Observable<Dish> =>
    this.imageService.addImage(dish.photo as File).pipe(
      switchMap(res => {
        console.log(dish.photo);
        delete dish.photo;
        dish.idPhoto = res.id;
        return this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}/${dish.idDish}`, dish)
          .pipe(switchMap(res1 => this.getDish(res1.id)));

      })
    );

  public saveDishWithoutPhoto = (dish: Dish): Observable<Dish> => {
    if (dish.idPhoto === -1) {
      dish.idPhoto = null;
    }
    return this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}/${dish.idDish}`, dish)
      .pipe(switchMap(res1 => this.getDish(res1.id)));
  };
}
