import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe-model/recipe.model';
import { DataRequestService } from '../services/data-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService  implements Resolve<Recipe[]> {


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.dataService.getRecipes()
  }

  constructor(private dataService:DataRequestService) { }

}
