import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {pathConfig} from '../configs/urlConfigs';
import {UpdatePasswordUser} from '../models/UpdatePasswordUser';

export interface AuthResponseType {
  success: boolean;
  message: string;
  token?: string;
  object?: string;
}

export interface UserLogin {
  name: string;
  password: string;
  isEmployee: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: UserLogin): Observable<AuthResponseType> {
    return this.http.post<AuthResponseType>(`${pathConfig.baseUrl}${pathConfig.accountAPI}/login`, user);
  }

  logout() {
    return this.http.post(`${pathConfig.baseUrl}${pathConfig.accountAPI}/logout`, {});
  }

  updatePassword(result: UpdatePasswordUser): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.accountAPI}/updatePassword`, result);

  }
}
