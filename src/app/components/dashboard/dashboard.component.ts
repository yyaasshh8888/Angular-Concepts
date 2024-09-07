import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfoBannerComponent } from '../info-banner/info-banner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, InfoBannerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  learningTopics: {
    title: string;
    subTitle: string;
    route: string;
    desc: string;
  }[] = [
    //  Custom Directive
    {
      title: 'Directive',
      subTitle: 'Custom Directive',
      route: 'custom-directive',
      desc: 'To demonstrate an example of custom directive in Angular',
    },
    //  Custom Validators
    {
      title: 'Validator',
      subTitle: 'Custom Validators',
      route: 'custom-validator',
      desc: 'To demonstrate an example of custom validators in Angular',
    },
    //  Form Array
    {
      title: 'Form Array',
      subTitle: 'Form Array',
      route: 'form-array',
      desc: 'To demonstrate an example of form array using reactive form in Angular',
    },
    //  Image Carousel
    {
      title: 'Image Carousel',
      subTitle: 'Image Carousel',
      route: 'image-carousel',
      desc: 'To demonstrate an example of Image Carousel effect',
    },
  ];
}
