import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/components/layout/navbar/navbar.component';
import { FooterComponent } from '@/components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
})
export class AppComponent {
  title = 'emills-v2';
}
