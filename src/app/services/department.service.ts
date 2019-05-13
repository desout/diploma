import {Injectable} from '@angular/core';
import {Department} from '../models/Department';
import {BehaviorSubject, Observable, zip} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {pathConfig} from '../configs/urlConfigs';
import {first} from 'rxjs/internal/operators/first';
import {map, switchMap} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {EmployeeService} from './employee.service';
import {Employee} from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public currentDepartment$: BehaviorSubject<Department> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private employeeService: EmployeeService) {
    this.getAllDepartments().pipe(first(), map(res => res[0]), tap(res => {
      this.currentDepartment$.next(res);

    })).subscribe();
  }

  public getAllDepartments = () => this.http.get<Department[]>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}`);

  public getDepartment = (id: number) => this.http.get<Department>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}/${id}`);

  public updateCurrentDepartment = (id: number) =>
    this.http.get<Department>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}/${id}`)
      .pipe(map(res => res[0]), tap(res => this.currentDepartment$.next(res))).subscribe();

  getAllDepartmentsWithEmployees = (): Observable<Department[]> =>
    zip(this.getAllDepartments(), this.employeeService.getAllEmployees())
      .pipe(map(res => res[0].map((dep: Department) => ({
          ...dep, employees: res[1].filter((empl: Employee) => empl.Departments_idDepartment === dep.idDepartment)
        }))
      ));

  updateDepartment = (department: Department): Observable<Department> =>
    this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}/${department.idDepartment}`,
      department).pipe(switchMap(res1 => this.getDepartment(res1.id)));


  addDepartment = (department: Department): Observable<Department> =>
    this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.departmentsAPI}`, department)
      .pipe(switchMap(res1 => this.getDepartment(res1.id)));
}
