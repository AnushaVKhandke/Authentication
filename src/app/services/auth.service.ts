import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthResponse } from '../model/authResponse';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  user=new BehaviorSubject<User>(null)
  constructor(private http:HttpClient, private route:Router){}

  // http:HttpClient=Inject(HttpClient);

  signUp(email,password){
     const data={email:email,password:password,returnSecureToken:true};
     return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjg_4tfqyc5bGmGXRpsqHf5dn1m60AVCQ',data)
     .pipe(catchError(this.handleError),tap((res)=>{
        this.handleCreateUser(res);
     }))
      
      
  }


     login(email,password){
      const data={email:email,password:password,returnSecureToken:true};
      return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjg_4tfqyc5bGmGXRpsqHf5dn1m60AVCQ',data)
      .pipe(catchError(this.handleError),tap((res)=>{
        this.handleCreateUser(res);
     }))
     }

     logout(){
      this.user.next(null);
      this.route.navigate(['/login'])
     }

     autoLogin(){
      const user = JSON.parse(localStorage.getItem('user'))
      if(!user){
        return;
      }
      const loggedUser= new User(user.email,user.id,user._token,user._expiresIn);
      if(loggedUser.token){
        this.user.next(loggedUser)
      }
     }

     handleCreateUser(res){
      const expiresInTs = new Date().getTime() + +res.expiresIn*1000;
      const expiresIn = new Date(expiresInTs);
      const user=new User(res.email,res.localId,res.idToken,expiresIn)
      this.user.next(user);

      localStorage.setItem('user',JSON.stringify(user))
     }
     private handleError(err){
      let errorMsg="an unknown error occured";
      if(!err.error || !err.error.error){
        return throwError(()=>{errorMsg})
      }
      switch(err.error.error.message){
        case 'EMAIL_EXISTS':
          errorMsg="this email already exists";
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMsg="invalid operation";  
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg="email not found";
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMsg="password or email is incorrect";
          break;    
      }
      return throwError(()=>errorMsg);
     }
     }
  

