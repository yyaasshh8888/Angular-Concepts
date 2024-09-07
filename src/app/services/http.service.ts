import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IPhotosResponse } from '../models/photos.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  readonly getPhotosAPI: string = `https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=4`;

  getImages(): Observable<IPhotosResponse> {
    return this.http
      .get<IPhotosResponse>(this.getPhotosAPI)
      .pipe(shareReplay());
  }
}
