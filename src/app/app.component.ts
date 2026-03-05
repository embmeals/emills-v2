import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from '@/components/layout/navbar/navbar.component';
import { FooterComponent } from '@/components/layout/footer/footer.component';
import { HeroComponent } from '@/components/sections/hero/hero.component';
import { AboutComponent } from '@/components/sections/about/about.component';
import { SkillsComponent } from '@/components/sections/skills/skills.component';
import { ProjectsComponent } from '@/components/sections/projects/projects.component';
import { ExperienceComponent } from '@/components/sections/experience/experience.component';
import { GalleryComponent } from '@/components/sections/gallery/gallery.component';
import { ContactComponent } from '@/components/sections/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    GalleryComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'emills-v2';
}
