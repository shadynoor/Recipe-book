import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipe:Recipe
  isAuth = false

  // @Output() sendRecipeToParent = new EventEmitter<Recipe>()

  constructor(private recipeService:RecipesService , private router:Router , private activatedRoute:ActivatedRoute , private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.isAuth = !this.isAuth
      }else{
        this.isAuth = false
      }
    })
  }

  addNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.activatedRoute})
  }

  // getOneRecipe(recipe:Recipe){
  //   this.sendRecipeToParent.emit(recipe)
  // }

}
