import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
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
  private static readonly MIN_SPLASH_MS = 3000;
  private static readonly MAX_SPLASH_MS = 3400;

  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly cookieConsent = inject(CookieConsentService);
  readonly currentYear = new Date().getFullYear();
  readonly splashVisible = signal(true);
  readonly menuOpen = signal(false);

  constructor() {
    effect(() => {
      const open = this.menuOpen();
      if (typeof document === 'undefined') {
        return;
      }
      document.body.classList.toggle('overflow-hidden', open);
    });
  }

  ngOnInit(): void {
    this.seo.applyForCurrentRoute();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.seo.applyForCurrentRoute();
        this.closeMenu();
      });

    if (typeof document === 'undefined') {
      return;
    }

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    this.destroyRef.onDestroy(() => document.removeEventListener('keydown', onKeyDown));

    const started = performance.now();
    const minDone = new Promise<void>((resolve) => setTimeout(resolve, AppComponent.MIN_SPLASH_MS));
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      window.addEventListener('load', () => resolve(), { once: true });
    });

    let maxTimer: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
      this.splashVisible.set(false);
    }, AppComponent.MAX_SPLASH_MS);

    void Promise.all([minDone, loaded]).then(() => {
      if (maxTimer !== undefined) {
        clearTimeout(maxTimer);
        maxTimer = undefined;
      }
      const hideAt = Math.min(started + AppComponent.MAX_SPLASH_MS, started + AppComponent.MIN_SPLASH_MS);
      const delay = Math.max(0, hideAt - performance.now());
      setTimeout(() => this.splashVisible.set(false), delay);
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
