import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from './recipe-model/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService:RecipesService) {}

  ngOnInit(): void {

  }
}
