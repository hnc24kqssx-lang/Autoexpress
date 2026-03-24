import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'autoexpress_cookie_consent';

export type CookieConsentChoice = 'all' | 'essential';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly _choice = signal<CookieConsentChoice | null>(this.readStored());

  /** Aktualny wybór użytkownika lub `null`, jeśli nie wyraził zgody. */
  readonly choice = this._choice.asReadonly();

  /** Czy wyświetlić baner zgody. */
  readonly showBanner = computed(() => this._choice() === null);

  /** Czy można ładować treści stron trzecich (np. wtyczka Facebook). */
  readonly allowsThirdPartyEmbeds = computed(() => this._choice() === 'all');

  acceptAll(): void {
    this.persist('all');
  }

  acceptEssentialOnly(): void {
    this.persist('essential');
  }

  /** Ponowne otwarcie wyboru (np. ze stopki). */
  openPreferences(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    this._choice.set(null);
  }

  private persist(value: CookieConsentChoice): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value);
    }
    this._choice.set(value);
  }

  private readStored(): CookieConsentChoice | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'all' || raw === 'essential') {
      return raw;
    }
    return null;
  }
}
