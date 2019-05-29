import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Provider} from '../../../models/Provider';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditProviderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Provider) {
    if (!data.idProvider) {
      this.providerForm.patchValue({
        idProvider: -1,
        contactsInfo: ''
      });
    }
  }

  providerForm = this.fb.group({
    idProvider: [this.data.idProvider],
    contractInfo: [this.data.contractInfo]
  });

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
