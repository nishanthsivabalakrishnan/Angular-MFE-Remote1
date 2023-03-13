import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { NotificationService } from 'src/app/Services/Notification/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(12),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(12),
  ]);
  resetToken:any;
  email:any;
  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private auhenticationServie: AuthenticationService,
    private router: Router,
    private security:CommonService,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.formBuilder.group({
      password: this.password,
      confirmPassword:this.confirmPassword
    },{validator: this.pwdConfirming('password', 'confirmPassword')});
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];  
      this.resetToken = params['rt'];   
  });
  }
  pwdConfirming(key: string, confirmationKey: string) {
    return (group: FormGroup) => {
        const input = group.controls[key];
        const confirmationInput = group.controls[confirmationKey];
        return confirmationInput.setErrors(
            input.value !== confirmationInput.value ? {notEquivalent: true} : null
        );
    };
  }
  submitLoginForm(){
    if(this.resetForm.invalid){
      return;
    }
    
    var dataToBackend={
      email:this.email,
      resetToken:this.resetToken,
      password:this.resetForm.controls['password'].value
    }
    this.auhenticationServie.ResetAndVerifyEmail(dataToBackend).subscribe((res)=>{
      var temp = JSON.parse(this.security.decryptData(res));
      if(temp.Status==1){
        this.notification.SuccessNotification(temp.Message);
        this.resetForm.reset();
        this.router.navigateByUrl('auth/login');
      }
      else{
        this.notification.ErrorNotification(temp.Message);
      }    
    })   
  }
}
