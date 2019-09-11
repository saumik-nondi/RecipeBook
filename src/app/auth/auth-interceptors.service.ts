import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthIterceptorsService implements HttpInterceptor{

  constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>,next: HttpHandler){

      return this.authService.user.pipe(take(1),exhaustMap(
        user=> {

          console.log('userytjr6yj',user)
          if(!user){
            console.log('first req', req)
            return next.handle(req)
          }
          const modifiedReq= req.clone({
            params: new HttpParams().set('auth', user.token)
          })
          console.log('first req', req)
          console.log('request param',modifiedReq)
          return next.handle(modifiedReq)
        }
      ))

    }
}
