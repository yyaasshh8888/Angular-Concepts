import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IPhoto } from '../../models/photos.model';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
  providers: [HttpService],
})
export class ImageCarouselComponent {
  currentIndex: number = 0;
  carouselSub!: Subscription;
  constructor(private _httpService: HttpService) {}
  photos: IPhoto[] = [];
  ngOnInit() {
    this._httpService.getImages().subscribe((response) => {
      console.log(response.photos);
      this.photos = response.photos;
      this.startCarousel();
    });
  }
  startCarousel() {
    this.carouselSub?.unsubscribe();
    this.carouselSub = interval(2000).subscribe(() => {
      this.currentIndex = this.currentIndex % this.photos.length;
      this.currentIndex++;
    });
  }
  ngOnDestroy(): void {
    this.carouselSub?.unsubscribe();
  }

  // This will return the current photo being displayed
  get currentPhoto(): IPhoto {
    return this.photos[this.currentIndex];
  }
}
