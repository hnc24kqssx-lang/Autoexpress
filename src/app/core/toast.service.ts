import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly state = signal<{ message: string; kind: ToastKind } | null>(null);

  private clearId: ReturnType<typeof setTimeout> | undefined;

  show(message: string, kind: ToastKind = 'success', durationMs = 5000): void {
    if (this.clearId !== undefined) {
      clearTimeout(this.clearId);
    }
    this.state.set({ message, kind });
    this.clearId = setTimeout(() => this.dismiss(), durationMs);
  }

  dismiss(): void {
    if (this.clearId !== undefined) {
      clearTimeout(this.clearId);
      this.clearId = undefined;
    }
    this.state.set(null);
  }
}
