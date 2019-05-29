import {Injectable} from '@angular/core';
import {Ingredient} from '../models/Ingredient';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {pathConfig} from '../configs/urlConfigs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  getAllIngredients = (): Observable<Ingredient[]> => this.http.get<Ingredient[]>(`${pathConfig.baseUrl}${pathConfig.ingredientAPI}`);
  getIngredientsByDish = (id: number): Observable<Ingredient[]> => this.http.get<Ingredient[]>(`${pathConfig.baseUrl}${pathConfig.dishesAPI}/${id}/ingredients`);
  getIngredientById = (id: number): Observable<Ingredient> => this.http.get<Ingredient>(`${pathConfig.baseUrl}${pathConfig.ingredientAPI}/${id}`);
  addIngredient = (ingredient: Ingredient): Observable<Ingredient> => this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.ingredientAPI}`, ingredient)
    .pipe(switchMap(res1 => this.getIngredientById(res1.id)));


  updateIngredient = (ingredient: Ingredient): Observable<Ingredient> => this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.ingredientAPI}/${ingredient.idIngredient}`, ingredient)
    .pipe(switchMap(res1 => this.getIngredientById(res1.id)));


}
