import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url:string = 'http://localhost:3000/api'

  constructor(private client: HttpClient) { }

  getPosts(){
    return this.client.get(`${this.url}/posts/`);
  }

  addPost(post:Post){
    return this.client.post(`${this.url}/posts/`, post);
  }

  voteScore(post:Post){
    return this.client.put(`${this.url}/posts/`, post);
  }

}
