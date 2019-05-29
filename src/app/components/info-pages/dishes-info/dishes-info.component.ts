import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Dish} from '../../../models/Dish';
import {DishesService} from '../../../services/dishes.service';
import {ImageService} from '../../../services/image.service';
import {EditDishComponent} from '../../edit-pages/edit-dish/edit-dish.component';

@Component({
  selector: 'app-dishes-info',
  templateUrl: './dishes-info.component.html',
  styleUrls: ['./dishes-info.component.scss']
})
export class DishesInfoComponent implements OnInit {

  constructor(private dishesService: DishesService, public dialog: MatDialog, private imageService: ImageService
  ) {
  }

  displayedColumns: string[] = ['dishName', 'idIngredient', 'name', 'cost', 'count'];
  dataSource: MatTableDataSource<Dish>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateDishes();
  }

  updateDishes() {
    this.dishesService.getAllDishesIngredients().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialog(dish: Dish): void {
    if (dish) {
      if (dish.idPhoto) {
        this.imageService.getImage(dish.idPhoto).subscribe(res => {
          dish.photo = res;
          const dialogRef = this.dialog.open(EditDishComponent, {
            width: '600px',
            data: dish
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.dishesService.saveDish(result).subscribe(() => this.updateDishes());
            }
          });
        });
      } else {
        const dialogRef = this.dialog.open(EditDishComponent, {
          width: '600px',
          data: dish
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dishesService.saveDish(result).subscribe(() => this.updateDishes());
          }
        });
      }
    } else {
      const dialogRef = this.dialog.open(EditDishComponent, {
        width: '600px',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result: undefined | Dish) => {
        if (result) {
          this.dishesService.addDish(result).subscribe(() => this.updateDishes());
        }
      });

    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
