import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import {Subject} from 'rxjs';


export class ShoppingListServices{

  ingredientChanged=new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[]=[]


  startedEditting = new Subject<number>()

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    console.log("ingredients Changed",ingredient)
    this.ingredientChanged.emit(this.ingredients.slice());
 }

 getIngredients(){
   return this.ingredients.slice()
 }
 getIngredient(index:number){
   return this.ingredients[index];
 }

 addIngredients(ingredients:Ingredient[]){
   this.ingredients.push(...ingredients);
   this.ingredientChanged.emit(this.ingredients.slice())
 }

 updateIngredient(index: number, newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientChanged.emit(this.ingredients.slice());
 }

 deleteIngredient(index:number){
   this.ingredients.splice(index,1);
   console.log("delete service function ", index)
   this.ingredientChanged.emit(this.ingredients.slice())
 }
}
