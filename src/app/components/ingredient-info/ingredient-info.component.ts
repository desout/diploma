import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Ingredient} from '../../models/Ingredient';
import {IngredientService} from '../../services/ingredient.service';
import {EditIngredientComponent} from '../edit-ingredient/edit-ingredient.component';

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.scss']
})
export class IngredientInfoComponent implements OnInit {

  constructor(private ingredientService: IngredientService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['idIngredient', 'name', 'cost', 'count', 'actions'];
  dataSource: MatTableDataSource<Ingredient>;
  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.ingredientService.getAllIngredients().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditDialog(ingredient: Ingredient): void {
    const dialogRef = this.dialog.open(EditIngredientComponent, {
      width: '600px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe((result: undefined | Ingredient) => {
      if (result) {
        console.log(result);
        if (result.idIngredient === -1) {
          this.ingredientService.addIngredient(result).subscribe(() => this.updateData());
        } else {
          this.ingredientService.updateIngredient(result).subscribe(() => this.updateData());
        }
      }
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
