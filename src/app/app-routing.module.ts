import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router'
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  {path: 'recipes', component: RecipesComponent , children: [
    { path: '', component: RecipeStartComponent , pathMatch: 'full'},
    { path: 'new', component: RecipeEditComponent, pathMatch: 'full' },
    { path: ':id', component: RecipeDetailComponent, pathMatch: 'full'},
    { path: ':id/edit', component: RecipeEditComponent, pathMatch: 'full' }
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  { path: 'auth-page', component: AuthComponent}
];
@NgModule({
  imports:[ RouterModule.forRoot(appRoutes)],
  exports:[ RouterModule]
})

export class AppRoutingModule{

}
