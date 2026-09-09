import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroComponent } from '@/components/sections/hero/hero.component';
import { ExperienceComponent } from '@/components/sections/experience/experience.component';
import { EducationComponent } from '@/components/sections/education/education.component';
import { ContactComponent } from '@/components/sections/contact/contact.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home">
      <app-hero />
    </section>

    <section id="experience" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-experience />
      </div>
    </section>

    <section id="education" class="px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-5xl w-full mx-auto">
        <app-education />
      </div>
    </section>

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
