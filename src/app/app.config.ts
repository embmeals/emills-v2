import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler, Injectable } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideZard } from '@/shared/core/provider/providezard';
import { routes } from './app.routes';

@Injectable()
class ChunkErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    const msg = (error as Error)?.message ?? '';
    if (msg.includes('Loading chunk') || msg.includes('ChunkLoadError') || msg.includes('Failed to fetch dynamically imported module')) {
      window.location.reload();
      return;
    }
    console.error(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideZard(),
    { provide: ErrorHandler, useClass: ChunkErrorHandler },
  ],
};
