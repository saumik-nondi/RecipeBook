import { Component, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {


  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      console.log('something going wrong')
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;


    if (this.isLoginMode) {
      console.log('logIn')
      authObs = this.authService.logIn(email, password)
    }
    else {
      console.log('signUp')
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, errorMessage=> {
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false
    });

    form.reset();
  }

}
