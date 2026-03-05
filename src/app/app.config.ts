import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideZard } from '@/shared/core/provider/providezard';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideZard(),]
};
