import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Strona główna' } },
  { path: 'nowosci', component: NewsComponent, data: { title: 'Nowości' } },
  {
    path: 'polityka-prywatnosci',
    component: PrivacyComponent,
    data: { title: 'Polityka prywatności' },
  },
  { path: '**', redirectTo: '' },
];
