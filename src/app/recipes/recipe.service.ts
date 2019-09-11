
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
  recipeSelected = new  EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes:Recipe[]=[];

  constructor(private shoppingListService: ShoppingListServices){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    return this.recipesChanged.next(this.recipes.slice())
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe:Recipe){
    console.log('re',recipe)
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deletRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
