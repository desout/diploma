import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Client} from '../../../models/Client';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Client,
              public clientService: ClientService) {
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
  public onOK = (result: undefined | Client) => {
      if (result) {
        if (result.idClient === -1) {
          result.password = result.name;
          this.clientService.addClient(result).subscribe((res) => {
            if (res.idClient === -1) {
              this.clientForm.controls.name.setErrors({incorrect: true});
            } else {
              this.dialogRef.close();
            }
          });
        } else {
          this.clientService.updateClient(result).subscribe((res) => {
            if (res.idClient === -1) {
              this.clientForm.controls.name.setErrors({incorrect: true});
            } else {
              this.dialogRef.close();
            }
          });
        }
      }
    };

  onNoClick(): void {
    this.dialogRef.close();
  }

}
