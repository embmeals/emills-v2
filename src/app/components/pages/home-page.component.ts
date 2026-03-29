import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroComponent } from '@/components/sections/hero/hero.component';
import { AboutComponent } from '@/components/sections/about/about.component';
import { SkillsComponent } from '@/components/sections/skills/skills.component';
import { ProjectsComponent } from '@/components/sections/projects/projects.component';
import { ExperienceComponent } from '@/components/sections/experience/experience.component';
import { ContactComponent } from '@/components/sections/contact/contact.component';
import { AdvocacyComponent } from '@/components/sections/advocacy/advocacy.component';
import { SectionDividerComponent } from '@/components/layout/section-divider/section-divider.component';

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
    AdvocacyComponent,
    SectionDividerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home">
      <app-hero />
    </section>

    <app-section-divider label="Crew Dossier" />

    <section id="about" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-about />
      </div>
    </section>

    <app-section-divider label="Systems Check" />

    <section id="skills" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-skills />
      </div>
    </section>

    <app-section-divider label="Mission Log" />

    <section id="projects" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-projects />
      </div>
    </section>

    <app-section-divider label="Service Record" />

    <section id="experience" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-experience />
      </div>
    </section>

    <app-section-divider label="Signal Boost" />

    <section id="advocacy" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-advocacy />
      </div>
    </section>

    <app-section-divider label="Open Channel" />

    <section id="contact" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-contact />
      </div>
    </section>
  `,
})
export class HomePageComponent implements OnInit {
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('Ember Mills | Senior Full Stack Engineer');
  }
}
