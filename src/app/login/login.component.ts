import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../model/authResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 isLoggedIn=true;
 isLoading=false;
 errorMsg:string|null=null;
 authObs:Observable<AuthResponse>;


constructor(private authservice:AuthService, private route:Router){}
 //authservice:AuthService = inject(AuthService)

 onSwitch(){
  this.isLoggedIn=!this.isLoggedIn
 }

 onSubmitted(form:NgForm){
  const email=form.value.email;
  const password=form.value.password;

  if(this.isLoggedIn){
    this.isLoading=true;
    this.authObs=this.authservice.login(email,password)

  }else{
    this.isLoading=true;
    this.authObs=this.authservice.signUp(email,password)
  }
  this.authObs.subscribe({
    next:(res)=>{console.log(res)
      this.isLoading=false;
      this.route.navigate(['/product'])
    },
    error:(errMsg)=>{
      this.isLoading=false;
      this.errorMsg=errMsg;
      this.hideSnackbar();
     
    }
})


   form.reset();
 }

 hideSnackbar(){
  setTimeout(()=>{
    this.errorMsg=null;
  },3000)
 }


}
