import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Client} from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Client) {
    if (!data.idClient) {
      this.clientForm.patchValue({
        idClient: -1,
        name: '',
        contacts: '',
        discount: 0
      });
    }
  }

  clientForm = this.fb.group({
    idClient: [this.data.idClient],
    name: [this.data.name],
    contacts: [this.data.contacts],
    discount: [this.data.discount]
  });

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
