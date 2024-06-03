import { Component, ViewChild } from '@angular/core';
import { product } from './model/product';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { AuthService } from './services/auth.service';
import { User } from './model/user';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 constructor(private authservice:AuthService){} 
 isLoggedIn = false;
 private userSub:Subscription;
 ngOnInit(){
  
      this.userSub=this.authservice.user.subscribe((user:User)=>{
      console.log(user);
      this.isLoggedIn = user ?true :false;
   })
   
 }
 ngOninit(){
  this.authservice.autoLogin();
 }

 onLogout(){
  this.authservice.logout();
 }

 onDestroy(){
  this.userSub.unsubscribe();
 }
  
}
