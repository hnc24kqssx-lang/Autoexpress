import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';

/** Widoczny głównie na mobile (ukryty od breakpointu md w górę). */
@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss',
})
export class BackToTopComponent {
  private readonly document = inject(DOCUMENT);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    const y = this.document.defaultView?.scrollY ?? 0;
    this.visible.set(y > 360);
  }

  scrollTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
