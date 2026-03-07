import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/components/layout/navbar/navbar.component';
import { FooterComponent } from '@/components/layout/footer/footer.component';
import { MusicPlayerComponent } from '@/components/layout/music-player/music-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MusicPlayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
    <app-music-player />
  `,
})
export class AppComponent {
  title = 'emills-v2';
}
