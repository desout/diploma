import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../../models/Dish';
import {Observable} from 'rxjs';
import {ImageService} from '../../../services/image.service';
import {IngredientService} from '../../../services/ingredient.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dish: Dish;
  photo: Observable<Blob>;
  ingredients: Observable<string>;

  constructor(private imageService: ImageService, private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredientsByDish(this.dish.idDish)
      .pipe(map(ingr => ingr.map(ing => ing.name)), map(res => res.join(', ')));
    this.photo = this.imageService.getImage(this.dish.idPhoto);
  }

}
