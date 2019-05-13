import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Dish} from '../../models/Dish';
import {DishesService} from '../../services/dishes.service';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {
  dishes$: Observable<Dish[]>;
  @Input() idCategory: number;

  constructor(private dishesService: DishesService, private departmentService: DepartmentService) {


  }

  ngOnInit() {
    this.departmentService.currentDepartment$
      .subscribe((dep) => this.dishes$ = this.dishesService.getCategoryMenuDishes(dep.idDepartment, this.idCategory));
  }

}
