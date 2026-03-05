import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '@/components/sections/hero/hero.component';
import { AboutComponent } from '@/components/sections/about/about.component';
import { SkillsComponent } from '@/components/sections/skills/skills.component';
import { ProjectsComponent } from '@/components/sections/projects/projects.component';
import { ExperienceComponent } from '@/components/sections/experience/experience.component';
import { ContactComponent } from '@/components/sections/contact/contact.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home">
      <app-hero />
    </section>

    <section id="about" class="px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-5xl w-full mx-auto">
        <app-about />
      </div>
    </section>

    <section id="skills" class="px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-5xl w-full mx-auto">
        <app-skills />
      </div>
    </section>

    <section id="projects" class="px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-5xl w-full mx-auto">
        <app-projects />
      </div>
    </section>

    <section id="experience" class="px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-5xl w-full mx-auto">
        <app-experience />
      </div>
    </section>

    <section id="contact" class="px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-5xl w-full mx-auto">
        <app-contact />
      </div>
    </section>
  `,
})
export class HomePageComponent {}
