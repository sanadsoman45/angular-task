import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit{
  posts: any[] = [];
  originalPosts: any[] = []; // Store original posts

  constructor(private postsService: PostsService) {
    
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (data:any) => {
        console.log(data);
        this.posts = data;
        this.originalPosts = [...data]; // Keep a copy of the original posts
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  upvote(post: Post) {
    post.score = post.score + 1;
    this.postsService.voteScore(post).subscribe({
      next: (data) => {
        console.log(data);
        const postIndex = this.originalPosts.findIndex(
          (localPost) => localPost.id === post.id
        );
        if (postIndex > -1) {
          this.originalPosts[postIndex].score = post.score; // Update score in the original posts array
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  downvote(post: Post) {
    if (post.score > 0) {
      post.score = post.score - 1;
      this.postsService.voteScore(post).subscribe({
        next: (data) => {
          console.log(data);
          const postIndex = this.originalPosts.findIndex(
            (localPost) => localPost.id === post.id
          );
          if (postIndex > -1) {
            this.originalPosts[postIndex].score = post.score; // Update score in the original posts array
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onPostChange(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    // If search input is empty, revert to original posts
    if (!searchValue) {
      this.posts = [...this.originalPosts]; // Reset posts to original
    } else {
      // Filter posts based on title
      this.posts = this.originalPosts.filter((post: Post) =>
        post.title.toLowerCase().includes(searchValue)
      );
    }
  }
}
