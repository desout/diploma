import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {DeliveryHistoryItem} from '../../../models/DeliveryHistoryItem';
import {Ingredient} from '../../../models/Ingredient';
import {IngredientService} from '../../../services/ingredient.service';

@Component({
  selector: 'app-edit-history-item',
  templateUrl: './edit-history-item.component.html',
  styleUrls: ['./edit-history-item.component.scss']
})
export class EditHistoryItemComponent implements OnInit {

  constructor(private ingredientService: IngredientService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditHistoryItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DeliveryHistoryItem) {
  }

  ingredients$: Observable<Ingredient[]>;
  historyForm = this.fb.group({
    id: [-1],
    count: [0],
    cost: [0],
    date: [`${new Date().toDateString()}`],
    idProvider: [this.data.Providers_idProvider],
    idIngredient: [0]
  });

  ngOnInit() {
    this.ingredients$ = this.ingredientService.getAllIngredients();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
