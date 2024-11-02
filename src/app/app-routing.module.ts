import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' }, // Redirect to posts by default
  { path: 'posts', component: PostsComponent }, // Route for displaying posts
  { path: 'addpost', component: AddPostComponent }, // Route for viewing a single post
  { path: '**', redirectTo: '/posts' }, // Redirect to posts for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
