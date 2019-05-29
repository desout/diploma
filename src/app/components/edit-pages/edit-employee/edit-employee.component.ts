import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/Department';
import {Employee} from '../../../models/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  roles = [
    {value: 'DIRECTOR', show: 'Director'},
    {value: 'ACCOUNTANT', show: 'Accountant'},
    {value: 'MERCHANDISER', show: 'Merchandiser'},
    {value: 'COOK', show: 'Cook'},
    {value: 'CASHIER', show: 'Cashier'},
    {value: 'WAITER', show: 'Waiter'},
    {value: 'CLIENT', show: 'Client'},
  ];

  constructor(private departmentService: DepartmentService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Employee) {
    if (!this.data.idEmployee) {
      this.employeeForm.patchValue({
        idEmployee: -1,
        firstName: '',
        secondName: '',
        lastName: '',
        login: '',
        passportData: '',
        dateOfBirth: new Date().toDateString(),
        role: '',
        salary: 0,
        Departments_idDepartment: null,
        contacts: ''
      } as Employee);
    }
  }

  departments$: Observable<Department[]>;
  employeeForm = this.fb.group({
    idEmployee: [this.data.idEmployee],
    firstName: [this.data.firstName],
    secondName: [this.data.secondName],
    lastName: [this.data.lastName],
    login: [this.data.login],
    passportData: [this.data.passportData],
    dateOfBirth: [this.data.dateOfBirth],
    role: [this.data.role],
    salary: [this.data.salary],
    Departments_idDepartment: [this.data.Departments_idDepartment],
    contacts: [this.data.contacts]
  });

  ngOnInit() {
    this.departments$ = this.departmentService.getAllDepartments();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
