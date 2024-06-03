import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../model/product';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  constructor(private http:HttpClient, private authservice:AuthService) { }

  createProduct(products:{pname:string,desc:string,price:string}){
    console.log(products);
      this.http.post<{name:string}>('https://angularauth-5f4ed-default-rtdb.firebaseio.com/products.json',products)
      .subscribe((res)=>{
        console.log(res)
      })
    
  }

  FetchProduct(){
    this.authservice.user.subscribe((user)=>{
      console.log(user)
    })
    return this.http.get<{[key:string]:product}>('https://angularauth-5f4ed-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res)=>{
      const products=[];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key],id:key})
        }
      }
      return products
    }))
    
  }

  deleteProduct(id:string){
    this.http.delete('https://angularauth-5f4ed-default-rtdb.firebaseio.com/products'+id+'.json')
    .subscribe();
  }

  deleteAllProduct(){
    this.http.delete('https://angularauth-5f4ed-default-rtdb.firebaseio.com/products.json')
    .subscribe();
  }
 
  updateProduct(id:string,value){
    this.http.put('https://angularhttp-a2b51-default-rtdb.firebaseio.com/products/'+id+'.json',value)
    .subscribe();
  }
}
