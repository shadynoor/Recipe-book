import { Ingredients } from "src/app/shopping-list/model/ingredients.model";

export class Recipe{
  public name:string;
  public description:string;
  public imgPath:string;
  public ingredients?:Ingredients[]
  public indexFromData?:string

  constructor(name:string,desc:string,imgPath:string,ingredients?:Ingredients[],indexFromData?:string){
    this.name = name;
    this.description = desc;
    this.imgPath = imgPath;
    this.ingredients = ingredients;
    this.indexFromData = indexFromData
  }

}
