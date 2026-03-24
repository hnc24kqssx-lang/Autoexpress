import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../core/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent {
  protected readonly cookies = inject(CookieConsentService);

  acceptAll(): void {
    this.cookies.acceptAll();
  }

  essentialOnly(): void {
    this.cookies.acceptEssentialOnly();
  }
}
