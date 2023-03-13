import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailPattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(this.emailPattern),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(12),
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private auhenticationServie: AuthenticationService,
    private router: Router,
    private security:CommonService
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
  submitLoginForm() {
    var dataToBackend = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.auhenticationServie.LoginUser(dataToBackend).subscribe(
      (res) => {
        var temp = JSON.parse(this.security.decryptData(res));
        localStorage.setItem('token', temp.Token);
        if (temp.Token != '' && temp.Status == 1) {
          if (localStorage.getItem('token')) {
            var informations = this.auhenticationServie.RetriveTokenInformation();
            this.notification.SuccessNotification(temp.Message);
            this.router.navigate([temp.Route]);            
          }
        } else {
          this.notification.ErrorNotification(temp.Message);
        }
      },
      (err) => {
        this.notification.FailureErrorNotification();
      }
    );
  }
}
