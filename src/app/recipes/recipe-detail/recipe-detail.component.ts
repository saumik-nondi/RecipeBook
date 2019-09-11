import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe :Recipe;
  id:number;

  constructor(private recipeService: RecipeService,
              private route:ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
      this.route.params.subscribe(
        (params:Params)=>{
          console.log('params',params)
          this.id = +params['id'];
          console.log("id",this.id)
          this.recipe = this.recipeService.getRecipe(this.id);
          console.log("this",this.recipe)
        }
      )
  }

  onDeleteRecipe() {
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes'])
  }


  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
