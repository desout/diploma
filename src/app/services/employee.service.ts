import {Injectable} from '@angular/core';
import {pathConfig} from '../configs/urlConfigs';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/Employee';
import {Observable} from 'rxjs';
import {getLocalDate, getUTCDate} from '../utils/date.formatter';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  public getEmployee = (id: number) => this.http.get<Employee>(`${pathConfig.baseUrl}${pathConfig.employeesAPI}/${id}`);

  public getAllEmployees = () => this.http.get<Employee[]>(`${pathConfig.baseUrl}${pathConfig.employeesAPI}`)
    .pipe(map(res => res.map(empl => this.getLocalEmployee(empl))));

  addEmployee = (employee: Employee): Observable<Employee> =>
    this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.employeesAPI}`, this.getExportEmployee(employee))
      .pipe(switchMap(res1 => this.getEmployee(res1.id)));

  updateEmployee = (employee: Employee): Observable<Employee> =>
    this.http.post<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.employeesAPI}/${employee.idEmployee}`,
      this.getExportEmployee(employee)).pipe(switchMap(res1 => this.getEmployee(res1.id)));

  getLocalEmployee = (employee: Employee): Employee => {
    return {...employee, dateOfBirth: getLocalDate(employee.dateOfBirth)};
  };

  getExportEmployee = (employee: Employee): Employee => {
    return {...employee, dateOfBirth: getUTCDate(employee.dateOfBirth)};
  };
}
