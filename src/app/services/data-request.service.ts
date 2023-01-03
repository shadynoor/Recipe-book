import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, Subject, take } from 'rxjs';
import { Recipe } from '../recipes/recipe-model/recipe.model';
import { AuthService } from './auth.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})

export class DataRequestService  {

  recipes = new Subject<Recipe[]>()

  constructor(private httpClient:HttpClient , private recipeServ:RecipesService,private authService:AuthService) {
   }

   getRecipes(){
    return this.httpClient.get<{[key:string] : Recipe}>(`https://recipe-projectt-default-rtdb.firebaseio.com/recipes.json/`)
    .pipe(map(data => {
      let RecipesArr:Recipe[] = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          RecipesArr.push({...data[key] , indexFromData:key})
        }
      }
      RecipesArr = RecipesArr.map(recipe => {
        return {...recipe , ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
      this.recipeServ.setRecipes(RecipesArr)
      this.recipes.next(RecipesArr)
      return RecipesArr
    }))
   }



   updateRecipes(recipes:Recipe[]){
    return this.httpClient.put('https://recipe-projectt-default-rtdb.firebaseio.com/recipes.json' ,recipes)
   }

   addRecipe(recipe:Recipe){
    return this.httpClient.post('https://recipe-projectt-default-rtdb.firebaseio.com/recipes.json' ,recipe)
   }

   deleteRecipe(recipe:Recipe){
    return this.httpClient.delete(`https://recipe-projectt-default-rtdb.firebaseio.com/recipes/${recipe.indexFromData}.json`)
  }
}
