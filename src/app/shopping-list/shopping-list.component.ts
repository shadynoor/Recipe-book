import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredients } from './model/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredients[]

  constructor(private shoppingService:ShoppingListService) {
    // this.shoppingService.oneIng.subscribe((ing) => {
    //   this.ingredients.push(ing)
    // })
   }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    this.shoppingService.ingChanged.subscribe((ing) => {
      this.ingredients = ing
    })
  }

  editSL(id:number){
    this.shoppingService.deleteIng(id)
  }

}
