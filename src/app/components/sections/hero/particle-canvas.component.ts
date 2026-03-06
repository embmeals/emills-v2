import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  readonly radius: number;
  readonly opacity: number;
}

@Component({
  selector: 'app-particle-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas
      #canvas
      class="absolute inset-0 z-0 w-full h-full"
      aria-hidden="true"
    ></canvas>
  `,
})
export class ParticleCanvasComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.initStaticCanvas();
        return;
      }
      this.initCanvas();
      this.resizeHandler = () => this.handleResize();
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  private initStaticCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.updateCanvasDimensions(canvas);
    this.particles = this.createParticles();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
      ctx.fill();
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.updateCanvasDimensions(canvas);
    this.particles = this.createParticles();
    this.animate(canvas);
  }

  private handleResize(): void {
    const canvas = this.canvasRef().nativeElement;
    this.updateCanvasDimensions(canvas);
    this.particles = this.createParticles();
  }

  private updateCanvasDimensions(canvas: HTMLCanvasElement): void {
    const parent = canvas.parentElement;
    this.canvasWidth = parent?.clientWidth ?? window.innerWidth;
    this.canvasHeight = parent?.clientHeight ?? window.innerHeight;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
  }

  private getParticleCount(): number {
    return window.innerWidth < 768 ? 30 : 60;
  }

  private createParticles(): Particle[] {
    const count = this.getParticleCount();
    return Array.from({ length: count }, () => this.createParticle());
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.3,
    };
  }

  private updateParticle(p: Particle): void {
    if (p.x + p.vx < 0 || p.x + p.vx > this.canvasWidth) {
      p.vx = -p.vx;
    }
    if (p.y + p.vy < 0 || p.y + p.vy > this.canvasHeight) {
      p.vy = -p.vy;
    }
    p.x += p.vx;
    p.y += p.vy;
  }

  private animate(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const draw = (): void => {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (const p of this.particles) {
        this.updateParticle(p);
      }

      // Draw connecting lines
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i];
          const b = this.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const lineOpacity = 0.05 + 0.1 * (1 - distance / 120);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of this.particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fill();
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    this.animationFrameId = requestAnimationFrame(draw);
  }
}
