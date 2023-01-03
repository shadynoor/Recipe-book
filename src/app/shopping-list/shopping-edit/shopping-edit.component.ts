import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredients } from '../model/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("ingName", {static:false}) ingName: ElementRef;
  @ViewChild("ingAmount", {static:false}) ingAmount: ElementRef;
  editName:string;
  editAmount:number
  deletedID:number

  // @Output() sendToList = new EventEmitter<Ingredients>()
  oneIng: Ingredients

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingService.editIng.subscribe((data) => {
      this.ingName.nativeElement.value = data.name;
      this.ingAmount.nativeElement.value = data.amount;
    })
    this.shoppingService.shoppingId.subscribe((data)=> {
      this.deletedID = data
    })
  }

  addIng(){
    // console.log(this.ingName.nativeElement.value);
    // console.log(amount.value);
    // this.sendToList.emit({name: this.ingName.nativeElement.value, amount: amount.value})
    // this.sendAmountToList.emit(amount.value)
    // this.shoppingService.oneIng.emit({name:this.ingName.nativeElement.value,amount:this.ingAmount.nativeElement.value})
    // const ing = {name:this.ingName.nativeElement.value,amount:this.ingAmount.nativeElement.value}

    this.oneIng = {name:this.ingName.nativeElement.value,amount:this.ingAmount.nativeElement.value}
    let opacity = document.querySelector(".opacity")
    let alert = document.querySelector(".theAlert")
    if (this.ingName.nativeElement.value && this.ingAmount.nativeElement.value) {
      this.shoppingService.addIngredient(this.oneIng);
      this.ingName.nativeElement.value = "";
      this.ingAmount.nativeElement.value = ""
    }else{
      opacity.classList.remove('hide')
      alert.classList.remove('hide')
      opacity.classList.add('show')
      alert.classList.add('show')
    }
  }


  close(){
    let opacity = document.querySelector(".opacity")
    let alert = document.querySelector(".theAlert")
    opacity.classList.remove('show')
    alert.classList.remove('show')
    opacity.classList.add('hide')
    alert.classList.add('hide')
  }

  clearForm(){
    this.ingName.nativeElement.value = ""
    this.ingAmount.nativeElement.value = ""
  }

}
