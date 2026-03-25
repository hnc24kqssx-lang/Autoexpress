import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  protected readonly toast = inject(ToastService);

  dismiss(): void {
    this.toast.dismiss();
  }
}
