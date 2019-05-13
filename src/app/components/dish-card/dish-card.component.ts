import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../models/Dish';
import {Observable} from 'rxjs';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dish: Dish;
  photo: Observable<Blob>;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {

    this.photo = this.imageService.getImage(this.dish.idPhoto);
  }

}
