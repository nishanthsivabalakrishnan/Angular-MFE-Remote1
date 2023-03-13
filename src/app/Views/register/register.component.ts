import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formValue !:FormGroup;

  constructor(private router: Router,private formBuilder:FormBuilder,private commonservice : CommonService,private authService:AuthenticationService) { 
    this.formValue=this.formBuilder.group({
      email:'',
      password:'',
      confirmPassword:'',
      username:'',
      dateOfBirth:''
    })
  }
  loginPage(){
    this.router.navigateByUrl('/auth/login');
  }
  submitSignupform(){
    if(this.formValue.value.password != this.formValue.value.confirmPassword){
      return;
    }
    var dataToPost={
      email:this.formValue.value.email,
      password:this.formValue.value.password,
      userName:this.formValue.value.username
    } 
    console.log(dataToPost);    
    console.log(this.commonservice.encryptData(dataToPost,false));
    this.authService.RegisterUser(dataToPost).subscribe((res)=>{
      if(res){
        var decryptResponse=this.commonservice.decryptData(res);
        var jsonResponse=JSON.parse(decryptResponse);
        if(jsonResponse.Status==2){
          console.log(jsonResponse.Message);
          this.router.navigateByUrl('/auth/login');         
        }else{
          console.log(jsonResponse.Message); 
        }
      }
    })
  }
}
