import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {pathConfig} from '../configs/urlConfigs';
import {Client} from '../models/Client';
import {Employee} from '../models/Employee';
import {LocalUser} from '../models/LocalUser';
import {roleConfig} from '../configs/roleConfig';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this.currentUser$ = this.getCurrentUser().pipe(first());
  }

  currentUser$: Observable<LocalUser>;

  static getLocalUser(user: Client | Employee): LocalUser {
    return {
      id: (user as Client).idClient ? (user as Client).idClient : (user as Employee).idEmployee,
      name: (user as Client).name ? (user as Client).name : `${(user as Employee).firstName} ${(user as Employee).lastName}`,
      discount: (user as Client).discount,
      roleName: (user as Employee).role ? (user as Employee).role : 'CLIENT',
      role: roleConfig[(user as Employee).role ? (user as Employee).role : 'CLIENT']
    };
  }

  getCurrentUser(): Observable<LocalUser> {
    const url = `${pathConfig.baseUrl}${pathConfig.accountAPI}/currentUser`;
    return this.http.get<Client | Employee>(url).pipe(map((user) => UserService.getLocalUser(user[0])));
  }

  updateCurrentUser(): void {
    const url = `${pathConfig.baseUrl}${pathConfig.accountAPI}/currentUser`;
    this.currentUser$ = this.http.get<Client | Employee>(url).pipe(map((user) => UserService.getLocalUser(user[0])));
  }


}
