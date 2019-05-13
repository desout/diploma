import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/Category';
import {ImageService} from '../../services/image.service';
import {EditCategoryComponent} from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories-info',
  templateUrl: './categories-info.component.html',
  styleUrls: ['./categories-info.component.scss']
})
export class CategoriesInfoComponent implements OnInit {

  constructor(private categoriesService: CategoryService, private imageService: ImageService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['idCategory', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Category>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.categoriesService.getAllCategoriesDishes().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialog(category: Category): void {
    if (category) {
      if (category.idPhoto) {
        this.imageService.getImage(category.idPhoto).subscribe(res => {
          category.photo = res;
          const dialogRef = this.dialog.open(EditCategoryComponent, {
            width: '600px',
            data: category
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.categoriesService.saveCategory(result).subscribe(() => this.updateData());
            }
          });
        });
      } else {
        const dialogRef = this.dialog.open(EditCategoryComponent, {
          width: '600px',
          data: category
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.categoriesService.saveCategory(result).subscribe(() => this.updateData());
          }
        });
      }
    } else {
      const dialogRef = this.dialog.open(EditCategoryComponent, {
        width: '600px',
        data: {}
      });

      dialogRef.afterClosed().subscribe((result: undefined | Category) => {
        if (result) {
          this.categoriesService.addCategory(result).subscribe(() => this.updateData());
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
