import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../models/Order';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  displayedColumns: string[] = ['idOrder', 'date', 'fullCost', 'discountCost', 'clientName', 'departmentName', 'status', 'dishes'];
  dataSource: MatTableDataSource<Order>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.orderService.getOrdersFilled().subscribe(res => {
      res = res.map(order => ({...order, dishList: order.dishes.map(dish => dish.name).join(', ')}));
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
