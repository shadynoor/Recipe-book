import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1)
      ,map(user => {
      // return !!user
      if (user) {
        return true
      }else{
        return this.router.createUrlTree(['/auth'])
      }
    }))
  }

  constructor(private authService:AuthService ,private router:Router){}
}
