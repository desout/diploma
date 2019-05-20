import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Provider} from '../models/Provider';
import {pathConfig} from '../configs/urlConfigs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) {
  }

  getAllProviders = (): Observable<Provider[]> =>
    this.http.get<Provider[]>(`${pathConfig.baseUrl}${pathConfig.providersAPI}`);

  updateProvider = (result: Provider): Observable<Provider> =>
    this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.providersAPI}/${result.idProvider}`, result)
      .pipe(switchMap(res => this.getProvider(res.id)));

  getProvider = (id: number): Observable<Provider> =>
    this.http.get<Provider>(`${pathConfig.baseUrl}${pathConfig.providersAPI}/${id}`);

  addProvider = (result: Provider): Observable<Provider> =>
    this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.providersAPI}`, result)
      .pipe(switchMap(res => this.getProvider(res.id)));
}
