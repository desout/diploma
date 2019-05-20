import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthResponseType} from '../services/auth.service';
import {pathConfig} from '../configs/urlConfigs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.http.post<AuthResponseType>(pathConfig.baseUrl + pathConfig.accountAPI + '/auth', null).pipe(map((response: AuthResponseType) => {
      if (response.success) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }));


  }
}
