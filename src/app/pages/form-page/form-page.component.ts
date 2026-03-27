import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { WORKSHOP_PHONES } from '../../core/contact.constants';

@Component({
  selector: 'app-form-page',
  imports: [RouterLink, ContactFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent {
  readonly phones = WORKSHOP_PHONES;
}
