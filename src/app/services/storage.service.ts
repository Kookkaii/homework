import { Injectable } from '@angular/core';
import { userInfo } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static readonly USER_KEY = 'user-auth';

  clean(): void {
    sessionStorage.clear();
  }
  //sessionStorage เก็บข้อมูลบน session 
  //localStorage เก็บข้อมูลบน local 
  public saveUserInfo(user: userInfo): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.setItem(StorageService.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(StorageService.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }

  public setToken(user: any): void {
    localStorage.removeItem(StorageService.USER_KEY);
    localStorage.setItem(StorageService.USER_KEY, JSON.stringify(user));
  }

  getUserInfo() :userInfo {
    const user = sessionStorage.getItem('USER_INFO');
    const userInfo :userInfo = user !== null ? JSON.parse(user) : "";
    return userInfo;
  }

  getToken():string {
   const user :userInfo = this.getUser();
   const token = user.accessToken;
   //console.log('token' ,user);
   return token;
  }
  getFullName():string {
    const user :userInfo = this.getUser();
    const fullName = user.fullName;
    //console.log('token' ,user);
    return fullName;
   }
  
}