import {Component, Inject, OnInit} from '@angular/core';
import {DepartmentService} from '../../services/department.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Department} from '../../models/Department';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department) {
    if (!this.data.idDepartment) {
      this.DepartmentForm.patchValue({
        idDepartment: -1,
        place: '',
        contacts: '',
        description: ''
      } as Department);
    }
  }

  DepartmentForm = this.fb.group({
    idDepartment: [this.data.idDepartment],
    place: [this.data.place],
    contacts: [this.data.contacts],
    description: [this.data.description]
  });

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
