import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, zip} from 'rxjs';
import {Order} from '../models/Order';
import {pathConfig} from '../configs/urlConfigs';
import {getLocalDate, getUTCDate} from '../utils/date.formatter';
import {concatAll, flatMap, map, toArray} from 'rxjs/operators';
import {DepartmentService} from './department.service';
import {chartItem, chartItems} from '../components/statistics/statistic/statistic.component';
import * as moment from 'moment';
import {DATE_FORMATS} from '../shared/configuration';
import {Dish} from '../models/Dish';
import {ClientService} from './client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private departmentService: DepartmentService, private clientService: ClientService) {
  }

  getAllOrders = (): Observable<Order[]> =>
    this.http.get<Order[]>(`${pathConfig.baseUrl}${pathConfig.ordersAPI}`)
      .pipe(map(res => res.map(order => this.getLocalOrder(order))));

  getGroupedOrders = (): Observable<chartItems[]> =>
    zip(this.departmentService.getAllDepartments(), this.getAllOrders())
      .pipe(
        map(res => res[0].map(dep => ({
          name: dep.place,
          series: this.generateSummary(res[1].filter(order => order.Departments_idDepartment === dep.idDepartment))
        }))));

  getOrdersFilled = (): Observable<Order[]> =>
    zip(this.getAllOrders(), this.departmentService.getAllDepartments(), this.clientService.getClients())
      .pipe(
        map(res =>
          res[0].map(order => {
              const client = res[2].find(c => c.idClient === order.Clients_idClient);
              return {
                ...order,
                departmentName: res[1].find(d => d.idDepartment === order.Departments_idDepartment).place,
                discountCost: order.fullCost * (client ? client.discount : 100) / 100,
                clientName: client ? client.name : undefined
              };
            }
          )),
        flatMap(res =>
          res.map(order =>
            this.getOrderDishes(order.idOrder).pipe(map(dishes => ({...order, dishes: dishes}))))),
        concatAll(),
        toArray());

  generateSummary = (orders: Order[]): chartItem[] =>
    orders.reduce((prev: chartItem[], curr) => {
      const elem = prev.findIndex(res =>
        moment(res.name, DATE_FORMATS, true)
          .format('YYYY-MM') === moment.utc(curr.date, DATE_FORMATS, true).format('YYYY-MM'));
      if (elem !== -1) {
        prev[elem].value += curr.fullCost;
      } else {
        prev.push({name: new Date(curr.date), value: curr.fullCost});
      }
      return prev;
    }, []);

  getOrderDishes = (id: number): Observable<Dish[]> =>
    this.http.get<Dish[]>(`${pathConfig.baseUrl}${pathConfig.ordersAPI}/${id}/dishes`);
  getLocalOrder = (order: Order): Order => {
    return {...order, date: getLocalDate(order.date)};
  };

  getExportOrder = (order: Order): Order => {
    return {...order, date: getUTCDate(order.date)};
  };
}
