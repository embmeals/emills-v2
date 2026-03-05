import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
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
export class ParticleCanvasComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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

  private updateParticle(p: Particle): Particle {
    let nextX = p.x + p.vx;
    let nextY = p.y + p.vy;
    let nextVx = p.vx;
    let nextVy = p.vy;

    if (nextX < 0 || nextX > this.canvasWidth) {
      nextVx = -nextVx;
      nextX = p.x + nextVx;
    }
    if (nextY < 0 || nextY > this.canvasHeight) {
      nextVy = -nextVy;
      nextY = p.y + nextVy;
    }

    return {
      ...p,
      x: nextX,
      y: nextY,
      vx: nextVx,
      vy: nextVy,
    };
  }

  private animate(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const draw = (): void => {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Update particles immutably
      this.particles = this.particles.map((p) => this.updateParticle(p));

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
