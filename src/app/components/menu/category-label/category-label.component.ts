import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../models/Category';
import {Observable} from 'rxjs';
import {ImageService} from '../../../services/image.service';

@Component({
  selector: 'app-category-label',
  templateUrl: './category-label.component.html',
  styleUrls: ['./category-label.component.scss']
})
export class CategoryLabelComponent implements OnInit {
  @Input() category: Category;
  photo: Observable<Blob>;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.photo = this.imageService.getImage(this.category.idPhoto);

  }

}
