import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe-model/recipe.model';
import { Ingredients } from '../shopping-list/model/ingredients.model';
import { DataRequestService } from './data-request.service';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
   recipes:Recipe[] = []


  // theRecipe = new EventEmitter<Recipe>()
  theRecipe = new Subject<Recipe>()


  getRecipes(){
    return this.recipes
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes
  }

  sendOneRecipe(id:number){
    return this.recipes.slice()[id]
  }

  getTheRecipeFromNew(recipe:Recipe){
    this.recipes.push(recipe)
  }


  constructor() {
   }
}
