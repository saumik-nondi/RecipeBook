import { Injectable, LOCALE_ID } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  token:string=null;


  user= new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private route: Router) {

  }


  signUp(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEBpdEZIIKC_-0jg4ffrQJspuXJsRZpZU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),tap(resData=>{
     this.handleAuthentication(
       resData.email,
       resData.localId,
       resData.idToken,
       +resData.expiresIn
       )


    }))

  }


  logOut(){
    this.user.next(null);
    this.route.navigate(['/auth-page']);
    localStorage.removeItem('userData');
  }

  logIn(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEBpdEZIIKC_-0jg4ffrQJspuXJsRZpZU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      )


    }))
  }

  // autiLogout(expire:number){
  //   setTimeout(()=>{
  //     this.logOut();
  //   },expire)
  // }

  autoLogin(){
    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:Date;
    }=JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return;
    }
    const loadedUser= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  private handleError(errors:HttpErrorResponse){
    let errorMessage = ' An unknown error'
    if (!errors.error || !errors.error.error) {
      return throwError(errorMessage)
    }
    switch (errors.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication (email:string, userId:string, token : string, expiresIn : number){
    const expirationDate = new Date ( new Date().getTime()+  + expiresIn*10000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user))
  }

}



