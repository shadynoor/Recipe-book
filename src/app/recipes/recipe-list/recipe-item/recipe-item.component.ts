import { Component, EventEmitter, Input, OnInit, Output , AfterContentChecked, AfterViewChecked } from '@angular/core';
import { DataRequestService } from 'src/app/services/data-request.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../recipe-model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit , AfterViewChecked {

  getRecipes:Recipe[] = []
  recipe:Recipe;
  test:Recipe[] = []


  // @Output() sendOneToList = new EventEmitter<Recipe>()

  constructor(private recipeService:RecipesService , private dataService:DataRequestService) { }

  ngAfterViewChecked(): void {

  }


  ngOnInit(): void {

    this.dataService.getRecipes().subscribe(recipes => {
      this.getRecipes = recipes
    })


  }

  sendTheRecipe(recipe:Recipe){
    this.recipeService.theRecipe.next(recipe)
  }



}
