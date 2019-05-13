import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/Category';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.scss']
})
export class CategoryTabComponent implements OnInit {
  @Input() category: Category;

  constructor(public departmentService: DepartmentService) {

  }

  ngOnInit() {
  }

}
