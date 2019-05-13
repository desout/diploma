import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../../models/Category';
import {FileInputComponent} from 'ngx-material-file-input';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category) {
    if (!data.idCategory) {
      this.dishForm.patchValue({
        description: '',
        idCategory: -1,
        idPhoto: -1,
        photo: undefined,
        name: ''
      });
    }
  }

  photoView: string | Blob | ArrayBuffer;
  dishForm = this.fb.group({
    idCategory: [this.data.idCategory],
    name: [this.data.name],
    idPhoto: [this.data.idPhoto],
    description: [this.data.description],
    photo: [undefined]
  });

  ngOnInit() {
    this.photoView = this.data.photo;
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
