import { AfterContentChecked, AfterContentInit, AfterViewInit, Component,  OnDestroy,  OnInit  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataRequestService } from 'src/app/services/data-request.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredients } from 'src/app/shopping-list/model/ingredients.model';
import { Recipe } from '../recipe-model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit , OnDestroy , AfterContentChecked  {

  // getRecipe = new Recipe("Burger" , "Simple Description" , "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg")

  ingredients:Ingredients[]

  getRecipe:Recipe
  displayDetails = false;
  id:number;
  subscription:Subscription;
  isAuth = false

  recipes:Recipe[]

  constructor(private authService:AuthService , private router:Router , private dataService:DataRequestService , private shoppingService:ShoppingListService , private activatedRoute:ActivatedRoute) {
   }
  ngAfterContentChecked(): void {
  }


  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params:Params) => {
      this.id = +params['id']

      // this.dataService.recipes.subscribe((data) => {
      //   this.recipes = data
      //   this.getRecipe = this.recipes[this.id]
      //   this.displayDetails = true
      // })

      this.dataService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes
        this.getRecipe = this.recipes[this.id]
        this.displayDetails = true
      })

    })



    this.authService.user.subscribe(user => {
      if (user) {
        this.isAuth = !this.isAuth
      }else{
        this.isAuth = false
      }
    })




    // this.recipeService.theRecipe.subscribe((recipe) => {
    //   this.getRecipe = recipe
    //   console.log(this.getRecipe);

    //   if (recipe) {
    //     this.displayDetails = true
    //   }
    // })
  }

  ngOnDestroy(): void {

  }


  sendToSL(ing:Ingredients[]){
    this.shoppingService.getFromRecipes(ing)
  }

  deleteRecipe(){
    this.dataService.deleteRecipe(this.getRecipe).subscribe()
    this.router.navigate(['./'])
    // window.location.reload()
  }

}
