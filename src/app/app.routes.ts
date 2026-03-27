import { Routes } from '@angular/router';
import { FormPageComponent } from './pages/form-page/form-page.component';
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
        'AutoExpress Szymon i Piotr Pełka — diagnostyka, naprawy, klimatyzacja, wulkanizacja w Trzeszczynie. Tel. +48 739 051 104 (Szymon), +48 608 461 421 (Piotr). Napisz przez formularz.',
    },
  },
  {
    path: 'formularz',
    component: FormPageComponent,
    data: {
      seoTitle: 'Napisz do nas',
      seoDescription:
        'Formularz kontaktowy AutoExpress — warsztat w Trzeszczynie, ul. Wspólna 24. Zadzwoń do Szymona lub Piotra albo wyślij wiadomość.',
    },
  },
  {
    path: 'nowosci',
    component: NewsComponent,
    data: {
      seoTitle: 'Nowości i aktualności',
      seoDescription:
        'Aktualności warsztatu AutoExpress w Trzeszczynie — śledź nas na Facebooku i bądź na bieżąco z promocjami oraz poradami.',
    },
  },
  {
    path: 'polityka-prywatnosci',
    component: PrivacyComponent,
    data: {
      seoTitle: 'Polityka prywatności',
      seoDescription:
        'Polityka prywatności i pliki cookies serwisu AutoExpress — warsztat samochodowy Szymon i Piotr Pełka, Trzeszczyn.',
    },
  },
  { path: '**', redirectTo: '' },
];
