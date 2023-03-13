import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonService } from '../Common/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private commonservice : CommonService) {   }

  LoginUser(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Authentication/LoginUser',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  RegisterUser(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Authentication/Register',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }
  ResetAndVerifyEmail(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post(environment.BaseURI + 'Authentication/ResetPasswordAndConfirmEmail',
      this.commonservice.encryptData(data,false), { headers: headers, responseType: 'text' })
      .pipe(map(function (response:any) { return response; }));
  }

  RetriveTokenInformation() {
    var token = localStorage.getItem('token');
    if (token != null) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT;
    }
    else{
      return null;
    }
  }
}
