
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor( private http : HttpClient) { }
  readonly baseURL='http://localhost:3000/blog';
  authToken;
  user;
 options;

 createAuthenticationHeaders()
 {
     this.loadToken();
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'authorization':this.authToken
    });
    this.options = {
       headers: headers
    }       
 }

 loadToken()
 {
   const token =localStorage.getItem('token');
   this.authToken = token;
 }
 newBlog(blog){
  this.createAuthenticationHeaders();
  return this.http.post(this.baseURL+'/newPost',blog,this.options);
}
getAllBlogs(){
  this.createAuthenticationHeaders();
  return this.http.get(this.baseURL+'/getPosts',this.options);


}
getSingleBlogs(id)
{
  this.createAuthenticationHeaders();
  return this.http.get(this.baseURL+'/getPost/'+id,this.options);

}
updateBlog(blog){
  this.createAuthenticationHeaders();
  return this.http.put(this.baseURL+'/updatePost',blog,this.options);
}
deleteBlog(id){
  this.createAuthenticationHeaders();
  return this.http.delete(this.baseURL+'/deletePost/'+id,this.options);
}

}
