import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '@/components/layout/navbar/navbar.component';
import { FooterComponent } from '@/components/layout/footer/footer.component';

interface Section {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'emills-v2';

  readonly sections: readonly Section[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ] as const;
}
