import { Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HighlightExampleComponent } from './components/highlight-example/highlight-example.component';
import { CustomValidatorComponent } from './components/custom-validator/custom-validator.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { NotFound404Component } from './components/404/404.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'custom-directive', component: HighlightExampleComponent },
  { path: 'custom-validator', component: CustomValidatorComponent },
  { path: 'form-array', component: FormArrayComponent },
  { path: 'image-carousel', component: ImageCarouselComponent },
  { path: '**', component: NotFound404Component },
];
