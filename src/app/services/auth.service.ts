import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { Iuser } from '../interfaces/iuser';
import { User } from '../interfaces/user.model';

export interface AuthResponseData {
  idToken:	string
  email:	string
  refreshToken: string
  expiresIn:	string
  localId:	string
  registered? :boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null)

  signUp(email:string,password:string){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmenGOhFf_ozk9jNkweYbEhb2ZNXRciVw'
    ,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap((data) => {
      this.handleAuth(data.email,data.localId,data.idToken,+data.expiresIn)
    }))
  }

  login(email:string,password:string){
    return this.httpClient.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmenGOhFf_ozk9jNkweYbEhb2ZNXRciVw",{
    email:email,
    password:password,
    returnSecureToken:true
    }).pipe(tap((data) => {
      this.handleAuth(data.email,data.localId,data.idToken,+data.expiresIn)
    }))
  }

  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
  }

  autoLogin(){
    const userData : {email:string,id:string,_token:string,_tokenExpired:string} = JSON.parse( localStorage.getItem('userData') )

    if (userData) {
      const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpired))
      if (loadedUser.token) {
        this.user.next(loadedUser)
      }
    }


  }

  private handleAuth(email:string,userId:string,token:string,expiresIn:number){
    const expiredDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,userId,token,expiredDate
    )
    this.user.next(user)
    localStorage.setItem('userData' , JSON.stringify(user))
  }

  private handleErrors(errorRes:HttpErrorResponse){
    if (errorRes.error) {
      return throwError(() => {
        return "Error"
      })
    }
  }


  constructor(private httpClient:HttpClient , private router:Router) { }
}
