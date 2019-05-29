import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';

export interface chartItems {
  name: string;
  series: chartItem[]
}

export interface chartItem {
  name: Date;
  value: number
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  constructor(private orderService: OrderService) {
  }

  view: any[] = [1200, 800];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Месяц';
  showYAxisLabel = true;
  yAxisLabel = 'Прибыль';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  data: chartItems[];

  ngOnInit() {
    this.init();
  }

  init() {
    this.orderService.getGroupedOrders().subscribe(res => this.data = res);

  }
}
