import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Client} from '../models/Client';
import {pathConfig} from '../configs/urlConfigs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {

  }

  getClients = (): Observable<Client[]> =>
    this.http.get<Client[]>(`${pathConfig.baseUrl}${pathConfig.clientsAPI}`);

  getClient = (id: number): Observable<Client> =>
    this.http.get<Client>(`${pathConfig.baseUrl}${pathConfig.clientsAPI}/${id}`);

  addClient = (result: Client): Observable<Client> =>
    this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.clientsAPI}`, result)
      .pipe(switchMap(res => {
        return this.getClient(res.id);
      }), catchError(res => {
        return of({idClient: -1, name: ''} as Client);
      }));


  updateClient = (result: Client) =>
    this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.clientsAPI}/${result.idClient}`, result)
      .pipe(switchMap(res => this.getClient(res.id)));

}
