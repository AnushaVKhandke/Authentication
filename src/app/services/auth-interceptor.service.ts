import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    // console.log("auth interceptoe");
    // return next.handle(req)

    // const modifiedReq=req.clone({headers:req.headers.append('auth','acxzyz')})
    const modifiedReq=req.clone()
    return next.handle(modifiedReq).pipe(tap((event)=>{
      if(event.type === HttpEventType.Response){
        console.log("response arrived")
        console.log(event.body)
      }
    }))
  }
  constructor() { }
}
