import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shopping-list/model/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingChanged = new EventEmitter<Ingredients[]>()

  private ingredients:Ingredients[] = [
    new Ingredients("Tomato" , 2),
    new Ingredients("Pickles" , 3)
  ]

  editIng = new Subject<Ingredients>()
  shoppingId = new Subject<number>()

  // oneIng = new EventEmitter<Ingredients>()
  getIngredients(){
    return this.ingredients
  }

  addIngredient(ing:Ingredients){
    this.ingredients.push(ing)
    this.ingChanged.emit(this.ingredients)
  }

  getFromRecipes(ing:Ingredients[]){
    this.ingredients = this.ingredients.concat(ing)
    this.ingChanged.emit(this.ingredients)
  }

  deleteIng(id:number){
    this.ingredients.splice(id,1)
  }


  constructor() { }

}
