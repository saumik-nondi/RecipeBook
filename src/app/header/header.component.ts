import {Component, OnInit, OnDestroy } from '@angular/core'
import { DataStorage } from '../shared/storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated= false;
  private userSub: Subscription;
  constructor(private DataStorageService: DataStorage, private authService: AuthService){}


  ngOnInit() {
         this.userSub= this.authService.user.subscribe(user=>{
              this.isAuthenticated= !user? false: true;
              console.log('Is Authenticated ? ', this.isAuthenticated)
         })
  }
  onSaveData(){
    this.DataStorageService.storeRecipes();
  }

  onFetchData(){
    console.log('fetching')
    this.DataStorageService.fetchRecipes();
  }

  logout(){
    this.authService.logOut()
  }

  ngOnDestroy(){

    this.userSub.unsubscribe()

  }
}
