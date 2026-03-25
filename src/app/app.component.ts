import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { CookieConsentService } from './core/cookie-consent.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private static readonly MAX_SPLASH_MS = 5000;
  private static readonly MIN_SPLASH_MS = 3600;

  protected readonly cookieConsent = inject(CookieConsentService);
  readonly currentYear = new Date().getFullYear();
  readonly splashVisible = signal(true);

  ngOnInit(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const started = performance.now();
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
      this.splashVisible.set(false);
    }, AppComponent.MAX_SPLASH_MS);

    const scheduleHideAfterLoad = (): void => {
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
      const loadTime = performance.now();
      const hideAt = Math.min(
        started + AppComponent.MAX_SPLASH_MS,
        Math.max(started + AppComponent.MIN_SPLASH_MS, loadTime),
      );
      const delay = Math.max(0, hideAt - performance.now());
      setTimeout(() => this.splashVisible.set(false), delay);
    };

    if (document.readyState === 'complete') {
      scheduleHideAfterLoad();
    } else {
      window.addEventListener('load', scheduleHideAfterLoad, { once: true });
    }
  }
}
