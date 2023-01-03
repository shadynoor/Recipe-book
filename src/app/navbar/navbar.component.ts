import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , OnDestroy {

  isAuth = false


  authSub: Subscription

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user
    })
  }

  logout(){
    this.isAuth = false
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }


  // sendDetailForNav(data:string){
  //   if (data == "Recipes") {
  //     this.getDataFromNav.emit("Recipes")
  //   }else{
  //     this.getDataFromNav.emit("Shopping List")
  //   }
  // }

}
