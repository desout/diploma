import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, zip} from 'rxjs';
import {DeliveryHistoryItem} from '../models/DeliveryHistoryItem';
import {pathConfig} from '../configs/urlConfigs';
import {IngredientService} from './ingredient.service';
import {ProviderService} from './provider.service';
import {Provider} from '../models/Provider';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient, private ingredientService: IngredientService, private providerService: ProviderService) {
  }

  getAllHistoryItems = (): Observable<DeliveryHistoryItem[]> =>
    this.http.get<DeliveryHistoryItem[]>(`${pathConfig.baseUrl}${pathConfig.historyAPI}`);

  getFullHistory = (): Observable<Provider[]> =>
    zip(this.providerService.getAllProviders(), this.getAllHistoryItems(), this.ingredientService.getAllIngredients())
      .pipe(
        map(res => res[0].map(
          provider => (
            {
              ...provider,
              history: res[1].filter(item => item.idProvider === provider.idProvider)
                .map(item => item.ingredientName = res[2].find(ingr => ingr.idIngredient === item.idIngredient).name)
            }
          ) as unknown as Provider)));

  addItem = (result: DeliveryHistoryItem): Observable<DeliveryHistoryItem> => {
    return;
  };
}
