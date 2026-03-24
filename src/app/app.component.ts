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
  protected readonly cookieConsent = inject(CookieConsentService);
  readonly currentYear = new Date().getFullYear();
  readonly splashVisible = signal(true);

  ngOnInit(): void {
    const minDisplayMs = 2200;
    const started = performance.now();

    const finish = () => {
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, minDisplayMs - elapsed);
      setTimeout(() => this.splashVisible.set(false), remaining);
    };

    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        finish();
      } else {
        window.addEventListener('load', finish, { once: true });
      }
    }
  }
}
