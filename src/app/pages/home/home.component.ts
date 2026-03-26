import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly phone = '+48 739 051 104';
  readonly phoneHref = 'tel:+48739051104';
  readonly facebookUrl = 'https://www.facebook.com/profile.php?id=61586096854664';
  readonly instagramUrl = 'https://www.instagram.com/autoexpress.trzeszczyn/';
}
