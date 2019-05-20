import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {DepartmentService} from '../../services/department.service';
import {COMPANY_NAME} from '../../shared/configuration';
import {Department} from '../../models/Department';
import {MatDialog, MatSelectChange} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AuthService, UserLogin} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {UpdatePasswordComponent} from '../update-password/update-password.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  constructor(public translate: TranslateService,
              private breakpointObserver: BreakpointObserver,
              public userService: UserService,
              public departmentService: DepartmentService,
              public authService: AuthService,
              public dialog: MatDialog,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
    translate.use('ru');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  companyName: string = COMPANY_NAME;
  allDepartments$: Observable<Department[]>;
  selectedDepartment: number;
  mobileQuery: MediaQueryList;
  isExpanded = true;
  showDirectorMenu = false;
  isShowing = false;
  private readonly _mobileQueryListener: () => void;
  showCountMenu = false;
  showMerchMenu = false;


  updateDepartmentSelect(e: MatSelectChange) {
    this.departmentService.updateCurrentDepartment(e.value);
  }

  ngOnInit(): void {
    this.allDepartments$ = this.departmentService.getAllDepartments();
    this.departmentService.currentDepartment$.subscribe(res => this.selectedDepartment = res ? res.idDepartment : -1);

  }

  logout(): void {
    this.authService.logout().pipe(tap(() => this.userService.updateCurrentUser())).subscribe();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {name: '', password: '', isEmployee: false} as UserLogin
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.password.length === 0) {
          result.password = undefined;
        }
        this.authService.login(result).subscribe(res => res.success ? this.userService.updateCurrentUser() : undefined);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openUpdatePasswordDialog() {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isEmployee) {
          result.role = 'EMPLOYEE';
        } else {
          result.role = 'CLIENT';
        }
        this.authService.updatePassword(result).subscribe();
      }
    });
  }
}
