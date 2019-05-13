import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Provider} from '../models/Provider';
import {pathConfig} from '../configs/urlConfigs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) {
  }

  getAllProviders = (): Observable<Provider[]> =>
    this.http.get<Provider[]>(`${pathConfig.baseUrl}${pathConfig.providersAPI}`);

  updateProvider = (result: Provider): Observable<Provider> => {
    return;
  };

  addProvider = (result: Provider): Observable<Provider> => {
    return;
  };
}
