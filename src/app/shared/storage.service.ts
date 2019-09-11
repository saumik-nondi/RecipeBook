import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, exhaustMap, tap, exhaust } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: "root" })
export class DataStorage {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {

    const recipes = this.recipeService.getRecipes()
    return this.http.put('https://recipe-book-7c62c.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response)
      }
    )
  }





   fetchRecipes() {

     return this.http.get<Recipe[]>('https://recipe-book-7c62c.firebaseio.com/recipes.json').subscribe(
        response=>{
          return this.recipeService.setRecipes(response)
       })
      }
    }
  //    )
    //.pipe(map(recipe=> {
    //   console.log('fetch recipe func', recipe)
    //   return recipe.map(recipe => {

    //     return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    //   });
    // }), tap(recipes => {
    //   this.recipeService.setRecipes(recipes)

    // })

    // )



