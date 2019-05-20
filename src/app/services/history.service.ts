import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, zip} from 'rxjs';
import {DeliveryHistoryItem} from '../models/DeliveryHistoryItem';
import {pathConfig} from '../configs/urlConfigs';
import {IngredientService} from './ingredient.service';
import {ProviderService} from './provider.service';
import {Provider} from '../models/Provider';
import {map, switchMap, tap} from 'rxjs/operators';
import {getLocalDate, getUTCDate} from '../utils/date.formatter';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient, private ingredientService: IngredientService, private providerService: ProviderService) {
  }

  getAllHistoryItems = (): Observable<DeliveryHistoryItem[]> =>
    this.http.get<DeliveryHistoryItem[]>(`${pathConfig.baseUrl}${pathConfig.historyAPI}`).pipe(
      map(res => res.map(item => this.getLocalHistory(item)))
    );

  getFullHistory = (): Observable<Provider[]> =>
    zip(this.providerService.getAllProviders(), this.getAllHistoryItems(), this.ingredientService.getAllIngredients())
      .pipe(tap(res => console.log(res)),
        map(res => res[0].map(
          provider => (
            {
              ...provider,
              history: res[1].filter(item => item.Providers_idProvider === provider.idProvider)
                .map(item => ({
                  ...item,
                  ingredientName: res[2].find(ingr => ingr.idIngredient === item.Ingredients_idIngredient).name
                }))
            }
          ) as unknown as Provider)));
  getHistoryItem = (id: number): Observable<DeliveryHistoryItem> =>
    this.http.get<DeliveryHistoryItem>(`${pathConfig.baseUrl}${pathConfig.historyAPI}/${id}`);

  addItem = (result: DeliveryHistoryItem): Observable<DeliveryHistoryItem> => {
    return this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.historyAPI}`, this.getExportHistory(result))
      .pipe(switchMap(res => this.getHistoryItem(res.id)));
  };
  getLocalHistory = (deliveryHistoryItem: DeliveryHistoryItem): DeliveryHistoryItem => {
    return {...deliveryHistoryItem, date: getLocalDate(deliveryHistoryItem.date)};
  };

  getExportHistory = (deliveryHistoryItem: DeliveryHistoryItem): DeliveryHistoryItem => {
    return {...deliveryHistoryItem, date: getUTCDate(deliveryHistoryItem.date)};
  };
}
