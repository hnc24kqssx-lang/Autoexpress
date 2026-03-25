import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', [Validators.maxLength(40)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
    accept: [false, Validators.requiredTrue],
  });

  fieldError(field: keyof typeof this.form.controls): string | null {
    const c = this.form.get(field);
    if (!c?.touched && !c?.dirty) {
      return null;
    }
    if (c.hasError('required')) {
      return 'To pole jest wymagane.';
    }
    if (c.hasError('email')) {
      return 'Podaj poprawny adres e-mail.';
    }
    if (c.hasError('minlength')) {
      return `Minimum ${c.errors?.['minlength'].requiredLength} znaków.`;
    }
    if (c.hasError('maxlength')) {
      return 'Za długa treść.';
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting()) {
      return;
    }

    const { publicKey, serviceId, templateId } = environment.emailjs;
    if (!publicKey || !serviceId || !templateId) {
      this.toast.show(
        'Formularz e-mail nie jest skonfigurowany. Uzupełnij klucze EmailJS w pliku environment.',
        'error',
        8000,
      );
      return;
    }

    this.submitting.set(true);
    const v = this.form.getRawValue();

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: v.name,
          reply_to: v.email,
          phone: v.phone || '—',
          message: v.message,
        },
        { publicKey },
      );
      this.toast.show('Wiadomość została wysłana. Dziękujemy za kontakt!', 'success');
      this.form.reset({ name: '', email: '', phone: '', message: '', accept: false });
    } catch {
      this.toast.show('Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.', 'error');
    } finally {
      this.submitting.set(false);
    }
  }
}
