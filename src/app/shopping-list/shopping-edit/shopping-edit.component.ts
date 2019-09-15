import { Component, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListServices) {

  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })

    })
  }
  onAddItem(form: NgForm) {
    console.log('form valoue', form.value.name)
    const newIngredient = new Ingredient(this.editedItem.name, form.value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()

  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    console.log('delete button')
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

}
