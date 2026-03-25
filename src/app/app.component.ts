import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { ToastComponent } from './components/toast/toast.component';
import { CookieConsentService } from './core/cookie-consent.service';
import { SeoService } from './core/seo.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CookieBannerComponent,
    ToastComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private static readonly MAX_SPLASH_MS = 5000;
  private static readonly MIN_SPLASH_MS = 3600;

  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly cookieConsent = inject(CookieConsentService);
  readonly currentYear = new Date().getFullYear();
  readonly splashVisible = signal(true);

  ngOnInit(): void {
    this.seo.applyForCurrentRoute();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.seo.applyForCurrentRoute());

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
