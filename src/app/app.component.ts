import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature='recipe';
  title = 'mxm-swm-pro';
  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}
