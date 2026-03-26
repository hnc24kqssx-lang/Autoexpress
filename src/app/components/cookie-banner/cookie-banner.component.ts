import { Component, DestroyRef, effect, inject } from '@angular/core';
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
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const show = this.cookies.showBanner();
      if (typeof document === 'undefined') {
        return;
      }
      document.body.classList.toggle('overflow-hidden', show);
    });

    this.destroyRef.onDestroy(() => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  acceptAll(): void {
    this.cookies.acceptAll();
  }

  essentialOnly(): void {
    this.cookies.acceptEssentialOnly();
  }
}
