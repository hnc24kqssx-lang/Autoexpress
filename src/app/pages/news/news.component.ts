import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { CookieConsentService } from '../../core/cookie-consent.service';

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (node?: Element | HTMLElement) => void };
    };
  }
}

/** URL strony / profilu FB — Page Plugin + XFBML. */
export const FACEBOOK_PAGE_HREF = 'https://www.facebook.com/profile.php?id=61586096854664';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly injector = inject(Injector);
  protected readonly cookieConsent = inject(CookieConsentService);

  readonly pageHref = FACEBOOK_PAGE_HREF;

  /** Kontener z markupiem `.fb-page` — musi być w DOM przed `FB.XFBML.parse`. */
  private readonly fbWrap = viewChild<ElementRef<HTMLElement>>('fbWrap');

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      if (!this.cookieConsent.allowsThirdPartyEmbeds()) {
        return;
      }
      afterNextRender(
        () => {
          queueMicrotask(() => this.ensureFacebookSdkAndParse());
        },
        { injector: this.injector },
      );
    });
  }

  private sdkInjected = false;

  /**
   * Iframe `page.php?tabs=timeline` powoduje u wielu użytkowników błąd FB 1357032 (wiszący spinner).
   * SDK + `data-show-posts="true"` (bez `data-tabs="timeline"`) to potwierdzony obejście w społeczności Meta.
   */
  private ensureFacebookSdkAndParse(): void {
    const root = this.fbWrap()?.nativeElement;
    if (!root) {
      return;
    }

    const parse = (): void => {
      window.FB?.XFBML?.parse(root);
    };

    const existing = document.getElementById('facebook-jssdk');
    if (existing) {
      if (window.FB?.XFBML) {
        parse();
      } else {
        existing.addEventListener('load', () => parse(), { once: true });
      }
      return;
    }

    if (this.sdkInjected) {
      return;
    }
    this.sdkInjected = true;

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v22.0';
    script.addEventListener('load', () => parse(), { once: true });
    document.body.appendChild(script);
  }
}
