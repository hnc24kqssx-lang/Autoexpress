import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import {
  WORKSHOP_ADDRESS_LINES,
  WORKSHOP_PHONES,
} from '../../core/contact.constants';

export interface PriceRow {
  service: string;
  price: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly phones = WORKSHOP_PHONES;
  readonly addressLines = WORKSHOP_ADDRESS_LINES;
  readonly facebookUrl = 'https://www.facebook.com/profile.php?id=61586096854664';
  readonly instagramUrl = 'https://www.instagram.com/autoexpress.trzeszczyn/';

  readonly priceRows: PriceRow[] = [
    { service: 'Wymiana oleju silnikowego + filtr oleju (standardowy)', price: 'od 120 zł' },
    { service: 'Serwis klimatyzacji — kontrola szczelności i uzupełnienie czynnika', price: 'od 150 zł' },
    { service: 'Odgrzybianie / ozonowanie układu klimatyzacji', price: 'od 180 zł' },
    { service: 'Wyważanie kół (komplet 4 szt.)', price: 'od 80 zł' },
    { service: 'Wulkanizacja — naprawa przebicia (łatka)', price: 'od 40 zł' },
    { service: 'Wymiana klocków hamulcowych przód (robocizna, części wycena osobno)', price: 'od 120 zł' },
    { service: 'Diagnostyka komputerowa + odczyt błędów', price: 'od 80 zł' },
  ];
}
