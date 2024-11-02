import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { Post } from 'src/app/interfaces/Posts';
import { ImagesService } from 'src/app/services/images.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  postForm!: FormGroup;
  selectedFile!: File | null;
  errorMessage:string = '';

  constructor(
    private postService: PostsService,
    private fb: FormBuilder,
    private imageService: ImagesService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
      const extname = fileTypes.test(file.name.toLowerCase().split('.').pop() || '');
      const mimetype = fileTypes.test(file.type);
      
      if (mimetype && extname) {
        this.selectedFile = file; // Get the selected file
        this.errorMessage = ''; // Clear any previous error message
      } else {
        this.selectedFile = null; // Clear the selected file
        this.errorMessage = 'Please select a valid image file (jpg, jpeg, png, gif)'; // Set error message
      }
    }
  }

  addPost(post: Post) {
    this.postService.addPost(post).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  uploadImage() {
    const post: Post = {
      id: 0,
      title: this.postForm.controls['title'].value,
      description: this.postForm.controls['description'].value,
      img_id: 0,
      publication_date: '',
      score: 0,
    };

    this.imageService
      .postImage(this.selectedFile)
      .pipe(
        concatMap((fileData: any) => {
          post['img_id'] = fileData.id;

          return this.postService.addPost(post);
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data) {
            this.router.navigate(['/posts']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.selectedFile) {
        this.uploadImage();
      }

      console.log(this.postForm.value);
      // Handle form submission logic here
    }
  }
}
