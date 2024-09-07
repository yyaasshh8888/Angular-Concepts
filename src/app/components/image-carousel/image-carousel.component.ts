import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IPhoto } from '../../models/photos.model';
import { CommonModule } from '@angular/common';
import { interval, map, Observable, Subscription } from 'rxjs';

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
  photos!: Observable<IPhoto[]>;
  length: number = 0;
  ngOnInit() {
    this.photos = this._httpService.getImages().pipe(
      map((response) => {
        this.startCarousel();
        this.length = response?.photos?.length;
        return response.photos;
      })
    );
  }
  startCarousel() {
    this.carouselSub?.unsubscribe();
    this.carouselSub = interval(2000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.length;
    });
  }
  ngOnDestroy(): void {
    this.carouselSub?.unsubscribe();
  }
}
