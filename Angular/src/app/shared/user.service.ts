import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData : User;
  list : User[];
  readonly rootUrl = "https://localhost:44379/api"

  constructor(private http : HttpClient) { }

  postUser(formData : User){
     return this.http.post(this.rootUrl+'/Users',formData)
  }

  refreshList(){
    this.http.get(this.rootUrl+'/Users')
    .toPromise().then(res => this.list = res as User[]);
  }

  getUser(){
     this.http.get(this.rootUrl+'/Users')
     .toPromise().then(res => this.list = res as User[]);
  }

  putUser(formData : User){
    return this.http.put(this.rootUrl+'/Users/'+formData.UserID,formData)
  }

  deleteUser(id : number){
    return this.http.delete(this.rootUrl+'/Users/'+id);
   }
}

