import { Component, OnInit } from '@angular/core';
import{ Ingredient} from '../shared/ingredient.model'
import { ShoppingListServices } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient [];
  constructor( private shoppingListService: ShoppingListServices) { }

  ngOnInit() {
    this.ingredients= this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }

  onEditItem(index: number){
      this.shoppingListService.startedEditting.next(index)
  }


}
