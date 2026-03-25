import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const DEFAULT_TITLE = 'Autoexpress — warsztat samochodowy w Trzeszczynie';
const DEFAULT_DESCRIPTION =
  'Autoexpress Szymon i Piotr Pełka — profesjonalny warsztat samochodowy w Trzeszczynie. Diagnostyka, naprawy, kontakt: +48 739 051 104.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  applyForCurrentRoute(): void {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = route.snapshot.data as Record<string, string | undefined>;

    const pageTitle = data['seoTitle'];
    const description = data['seoDescription'] ?? DEFAULT_DESCRIPTION;
    const fullTitle = pageTitle ? `${pageTitle} | Autoexpress` : DEFAULT_TITLE;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    const base = environment.siteUrl?.replace(/\/$/, '');
    if (base) {
      const path = this.document.defaultView?.location.pathname ?? '/';
      const ogUrl = `${base}${path === '/' ? '' : path}`;
      this.meta.updateTag({ property: 'og:url', content: ogUrl });

      const imageUrl = `${base}/logo.jpg`;
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

      this.setCanonical(`${base}${path || '/'}`);
    }
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    try {
      link.setAttribute('href', new URL(href).toString());
    } catch {
      link.setAttribute('href', href);
    }
  }
}
