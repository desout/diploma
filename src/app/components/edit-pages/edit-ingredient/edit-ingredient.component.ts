import {Component, Inject, OnInit} from '@angular/core';
import {IngredientService} from '../../../services/ingredient.service';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {Ingredient} from '../../../models/Ingredient';
import {Category} from '../../../models/Category';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {

  constructor(private ingredientService: IngredientService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditIngredientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ingredient) {
    if (!this.data.idIngredient) {
      this.ingredientForm.patchValue({
        idIngredient: -1,
        name: '',
        count: 0,
        type: '',
        cost: 0
      });
    }
  }

  ingredients$: Observable<Ingredient[]>;
  categories$: Observable<Category[]>;
  ingredientForm = this.fb.group({
    idIngredient: [this.data.idIngredient],
    name: [this.data.name],
    count: [this.data.count],
    type: [this.data.type],
    cost: [this.data.cost]
  });

  ngOnInit() {
    this.ingredients$ = this.ingredientService.getAllIngredients();
    this.categories$ = this.categoryService.getAllCategoriesDishes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
