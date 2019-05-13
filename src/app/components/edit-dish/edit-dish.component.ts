import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';
import {Observable} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category.service';
import {Dish} from '../../models/Dish';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FileInputComponent} from 'ngx-material-file-input';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.scss']
})
export class EditDishComponent implements OnInit {

  constructor(private ingredientService: IngredientService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditDishComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dish) {
    if (!data.idDish) {
      this.dishForm.patchValue({
        description: '',
        Categories_idCategory: 0,
        idDish: -1,
        idPhoto: -1,
        photo: undefined,
        ingredients: [],
        name: '',
        prepareTime: 0
      });
    }
  }

  photoView: string | Blob | ArrayBuffer;
  ingredients$: Observable<Ingredient[]>;
  categories$: Observable<Category[]>;
  dishForm = this.fb.group({
    idDish: [this.data.idDish],
    name: [this.data.name],
    idPhoto: [this.data.idPhoto],
    description: [this.data.description],
    Categories_idCategory: [this.data.Categories_idCategory],
    ingredients: [this.data.ingredients.map(ingr => ingr.idIngredient)],
    prepareTime: [this.data.prepareTime],
    photo: [undefined]
  });

  ngOnInit() {
    this.photoView = this.data.photo;
    this.ingredients$ = this.ingredientService.getAllIngredients();
    this.categories$ = this.categoryService.getAllCategoriesDishes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSetImage(files: FileInputComponent) {
    if (files.value && files.value.files[0]) {
      const value = files.value.files[0];
      this.dishForm.controls.photo.setValue(value);
      const reader = new FileReader();
      reader.onload = () => {
        this.photoView = reader.result;
      };
      reader.readAsDataURL(value);
    }
  }
}
