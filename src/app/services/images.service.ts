import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private url: string = 'http://localhost:3000/api/images';

  constructor(private client: HttpClient) { }

  postImage(imageFile: File | null): Observable<any> {
    if (!imageFile) {
      // Handle the null case
      return throwError(() => new Error('No image file provided')); // Use new syntax for throwError
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    return this.client.post(`${this.url}/upload-image`, formData).pipe(
      catchError(error => {
        console.error('Upload error:', error); // Log the error
        return throwError(() => error); // Propagate the error
      })
    );
  }
}
