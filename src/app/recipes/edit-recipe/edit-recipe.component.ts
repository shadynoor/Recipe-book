import { HttpClient } from '@angular/common/http';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataRequestService } from 'src/app/services/data-request.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredients } from 'src/app/shopping-list/model/ingredients.model';
import { Recipe } from '../recipe-model/recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit , OnDestroy {
  editMode = false;
  recipe:Recipe;
  ings:Ingredients[]

  editRecipe = new FormGroup(
    {
      name: new FormControl('',[Validators.minLength(5),Validators.required]) ,
      imgPath: new FormControl('',Validators.required) ,
      desc: new FormControl('',Validators.required) ,
      // ingName: new FormControl(''),
      // ingAmount: new FormControl(),
      Ingredients: new FormArray([])
    }
  )

  subscription:Subscription

  constructor(private activatedRoute:ActivatedRoute , private dataService:DataRequestService , private recipeService:RecipesService , private router:Router) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params:Params) => {
      if (params['id']) {
        this.recipe = this.recipeService.sendOneRecipe(params['id'])
        this.ings = this.recipe.ingredients
        this.editRecipe.controls.name.setValue(this.recipe.name);
        this.editRecipe.controls.imgPath.setValue(this.recipe.imgPath);
        this.editRecipe.controls.desc.setValue(this.recipe.description);
        // this.editRecipe.controls.ingName.setValue(this.recipe.ingredients[1].name)
        // this.editRecipe.controls.ingAmount.setValue(this.recipe.ingredients[1].amount)
        // console.log(this.editRecipe.controls.ingredients);
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          this.editRecipe.controls.Ingredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name),
              amount: new FormControl(this.recipe.ingredients[i].amount)
            })
          )
        }
      }
    })
  }

  submitForm(){
    if (this.recipe) {
      this.recipe.name = this.editRecipe.controls.name.value
      this.recipe.imgPath = this.editRecipe.controls.imgPath.value
      this.recipe.description = this.editRecipe.controls.desc.value
      for (let i = 0; i < this.editRecipe.controls.Ingredients.controls.length; i++) {
        this.recipe.ingredients[i].name = this.editRecipe.controls.Ingredients.value[i].name
        this.recipe.ingredients[i].amount = this.editRecipe.controls.Ingredients.value[i].amount
      }

      let recipes:Recipe[] = this.recipeService.getRecipes()
      this.dataService.updateRecipes(recipes).subscribe()


    }else{
      const theRecipe:Recipe = {
        name:this.editRecipe.controls.name.value ,
        description:this.editRecipe.controls.desc.value,
        imgPath:this.editRecipe.controls.imgPath.value,
        ingredients:[]
      }
      for (let i = 0; i < this.editRecipe.controls.Ingredients.controls.length; i++) {
        theRecipe.ingredients.push({name:this.editRecipe.controls.Ingredients.value[i].name , amount:this.editRecipe.controls.Ingredients.value[i].amount })
      }
      // this.recipeService.getTheRecipeFromNew(theRecipe)

      this.dataService.addRecipe(theRecipe).subscribe( data => {
        console.log(data);

      })
    }
    this.router.navigate(['../'] , {relativeTo:this.activatedRoute})
  }

  addNewIngredient(){
    this.editRecipe.controls.Ingredients.push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    )
  }

  removeIngredient(i:number){
    <FormArray><unknown>this.editRecipe.controls.Ingredients.removeAt(i)
    this.recipe.ingredients = this.editRecipe.controls.Ingredients.value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
