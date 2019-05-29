import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UpdatePasswordUser} from '../../../models/UpdatePasswordUser';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UpdatePasswordUser) {
  }

  updatePasswordForm = this.fb.group({
    login: [''],
    oldPassword: [''],
    newPassword: [''],
    isEmployee: [false]
  });

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
