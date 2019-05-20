import {Component, OnInit} from '@angular/core';
import {chartItems} from '../statistic/statistic.component';
import {OrderService} from '../../services/order.service';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-dishes-statistics',
  templateUrl: './dishes-statistics.component.html',
  styleUrls: ['./dishes-statistics.component.scss']
})
export class DishesStatisticsComponent implements OnInit {
  private originalData: chartItems[];

  constructor(private orderService: OrderService) {
  }

  view: any[] = [1200, 800];
  startDate: Date = new Date();
  endDate: Date = new Date();
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Месяц';
  showYAxisLabel = true;
  yAxisLabel = 'Количество';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  data: chartItems[];

  ngOnInit() {
    this.startDate.setFullYear(new Date().getFullYear() - 1);
    this.init();
  }

  init() {
    this.orderService.getOrdersFilled()
      .pipe(map(res => {
        const data: chartItems[] = [];
        res.forEach(order => order.dishes.map(dish => {
          const index = data.findIndex(item => item.name === dish.name);
          if (index !== -1) {
            const seriesIndex = data[index].series.findIndex(item => moment(item.name).format('YYYY-MM-DD') === moment(order.date).format('YYYY-MM-DD'));
            if (seriesIndex !== -1) {
              data[index].series[seriesIndex].value++;
            } else {
              data[index].series.push({name: new Date(order.date), value: 1});
            }
          } else {
            data.push({name: dish.name, series: []});
            const newIndex = data.length - 1;
            const seriesIndex = data[newIndex].series.findIndex(item => moment(item.name).format('YYYY-MM-DD') === moment(order.date).format('YYYY-MM-DD'));
            if (seriesIndex !== -1) {
              data[newIndex].series[seriesIndex].value++;
            } else {
              data[newIndex].series.push({name: new Date(order.date), value: 1});
            }
          }
        }));
        return data;
      }))
      .subscribe(res => {
        this.originalData = res;
        this.data = res;
      });

  }

  filterData() {
    this.data = this.originalData.map(item => ({
      ...item,
      series: item.series.filter(el => el.name >= this.startDate && el.name <= this.endDate)
    }));
  }

}
