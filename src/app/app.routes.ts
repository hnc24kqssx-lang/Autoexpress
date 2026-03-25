import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      seoTitle: 'Warsztat samochodowy Trzeszczyn',
      seoDescription:
        'Autoexpress Szymon i Piotr Pełka — diagnostyka, naprawy mechaniczne i obsługa aut w Trzeszczynie. Zadzwoń +48 739 051 104 lub napisz przez formularz.',
    },
  },
  {
    path: 'nowosci',
    component: NewsComponent,
    data: {
      seoTitle: 'Nowości i aktualności',
      seoDescription:
        'Aktualności warsztatu Autoexpress w Trzeszczynie — śledź nas na Facebooku i bądź na bieżąco z promocjami oraz poradami.',
    },
  },
  {
    path: 'polityka-prywatnosci',
    component: PrivacyComponent,
    data: {
      seoTitle: 'Polityka prywatności',
      seoDescription:
        'Polityka prywatności i pliki cookies serwisu Autoexpress — warsztat samochodowy Szymon i Piotr Pełka, Trzeszczyn.',
    },
  },
  { path: '**', redirectTo: '' },
];
