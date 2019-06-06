import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService, UserLogin} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserLogin,
              public authService: AuthService,
              public userService: UserService) {
  }
  public isValid = true;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isValid = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk(result: UserLogin): void {
    if (result) {
      this.authService.login(result).subscribe(res => {
        if (res.success) {
          this.userService.updateCurrentUser();
          this.dialogRef.close();
        }
        this.isValid = false;
      });
    }
  }
}
