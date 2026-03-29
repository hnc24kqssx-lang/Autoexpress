import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';

export type RevealVariant = 'up' | 'fade' | 'scale';

/**
 * Po wejściu sekcji w viewport uruchamia jednorazową animację wejścia (on show).
 * Szanuje prefers-reduced-motion; na SSR od razu pokazuje treść.
 */
@Directive({
  standalone: true,
  selector: '[appReveal]',
})
export class RevealOnScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private skipObserver = false;

  readonly appReveal = input<RevealVariant>('up');

  ngOnInit(): void {
    const host = this.el.nativeElement;
    if (!isPlatformBrowser(this.platformId)) {
      host.classList.add('reveal-visible');
      this.skipObserver = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.classList.add('reveal-visible');
      this.skipObserver = true;
      return;
    }
    host.setAttribute('data-reveal', this.appReveal());
    host.classList.add('reveal-wait');
  }

  ngAfterViewInit(): void {
    if (this.skipObserver) {
      return;
    }
    const host = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) {
            continue;
          }
          requestAnimationFrame(() => {
            host.classList.remove('reveal-wait');
            host.classList.add('reveal-visible');
          });
          this.observer?.unobserve(host);
        }
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
