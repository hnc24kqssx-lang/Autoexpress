import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CookieConsentService } from '../../core/cookie-consent.service';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly cookieConsent = inject(CookieConsentService);

  /** Facebook Page Plugin — oś czasu z ostatnimi wpisami. */
  readonly pluginUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    NewsComponent.buildPagePluginUrl(),
  );

  private static buildPagePluginUrl(): string {
    const profile = 'https://www.facebook.com/profile.php?id=61586096854664';
    const params = new URLSearchParams({
      href: profile,
      tabs: 'timeline',
      width: '500',
      height: '700',
      small_header: 'false',
      adapt_container_width: 'true',
      hide_cover: 'false',
      show_facepile: 'true',
    });
    return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
  }
}
