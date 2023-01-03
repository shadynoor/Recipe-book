import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeResolverService } from './shared/recipe-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'' ,redirectTo: '/recipes' , pathMatch:'full'} ,
  {path:'recipes' , component:RecipesComponent , children:[
    {path:'' , component:RecipeStartComponent},
    {path:'new' , component:EditRecipeComponent , canActivate:[AuthGuard]},
    {path:':id' , component:RecipeDetailComponent , resolve:[RecipeResolverService]},
    {path:':id/edit' , component:EditRecipeComponent , resolve:[RecipeResolverService] , canActivate:[AuthGuard]},
  ]},
  {path:'shopping-list' , component:ShoppingListComponent},
  {path:'auth' , component:AuthComponent},
  // {path:'**' , component:RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
