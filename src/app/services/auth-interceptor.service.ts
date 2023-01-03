import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn:'root'
})

export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(take(1),exhaustMap(user => {

      if (!user) {
        return next.handle(req)
      }else{
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth',user.token)
        })
        return next.handle(modifiedReq)
      }
    }))
  }

  constructor(private authService:AuthService){}
}
