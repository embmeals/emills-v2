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

interface ProtoParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  currentOpacity: number;
  phase: number;
  isNode: boolean;
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

  private particles: ProtoParticle[] = [];
  private animationFrameId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private time = 0;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

    const staticCount = window.innerWidth < 768 ? 120 : 300;
    const particles: ProtoParticle[] = Array.from(
      { length: staticCount },
      (_, i) => this.createParticle(i < staticCount * 0.12)
    );

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const connectionDist = 130;

    // Draw tendril connections
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (Math.abs(dx) > connectionDist || Math.abs(dy) > connectionDist) continue;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= connectionDist) continue;

        const strength = 1 - dist / connectionDist;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const cpx = mx + (-dy) * 0.06;
        const cpy = my + dx * 0.06;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
        ctx.strokeStyle = `rgba(0, 150, 255, ${strength * 0.12})`;
        ctx.lineWidth = strength * 1.2;
        ctx.stroke();
      }
    }

    // Draw particles with glow
    for (const p of particles) {
      if (p.isNode) {
        const glowSize = p.baseRadius * 6;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        glow.addColorStop(0, `rgba(0, 160, 255, ${p.opacity * 0.3})`);
        glow.addColorStop(0.4, `rgba(0, 120, 255, ${p.opacity * 0.1})`);
        glow.addColorStop(1, 'rgba(0, 80, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = p.isNode
        ? `rgba(0, 210, 255, ${p.opacity})`
        : `rgba(0, 170, 255, ${p.opacity * 0.8})`;
      ctx.fill();

      if (p.isNode) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 230, 255, ${p.opacity * 0.5})`;
        ctx.fill();
      }
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
    return window.innerWidth < 768 ? 100 : 450;
  }

  private createParticles(): ProtoParticle[] {
    const count = this.getParticleCount();
    return Array.from({ length: count }, (_, i) => this.createParticle(i < count * 0.15));
  }

  private createParticle(isNode: boolean): ProtoParticle {
    const baseRadius = isNode ? 2.5 + Math.random() * 2 : 0.8 + Math.random() * 1.5;
    const opacity = isNode ? 0.5 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3;
    return {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      vx: (Math.random() - 0.5) * (isNode ? 0.9 : 1.4),
      vy: (Math.random() - 0.5) * (isNode ? 0.9 : 1.4),
      radius: baseRadius,
      baseRadius,
      opacity,
      currentOpacity: opacity,
      phase: Math.random() * Math.PI * 2,
      isNode,
    };
  }

  private animate(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const connectionDist = 160;

    const draw = (): void => {
      this.time += 0.02;
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Update particle positions with organic drift
      for (const p of this.particles) {
        const drift = p.isNode ? 0.8 : 1.2;
        p.x += p.vx + Math.sin(this.time * 2.0 + p.phase) * drift
                     + Math.sin(this.time * 5.3 + p.phase * 2.7) * drift * 0.3;
        p.y += p.vy + Math.cos(this.time * 1.7 + p.phase * 1.3) * drift
                     + Math.cos(this.time * 4.1 + p.phase * 3.1) * drift * 0.3;

        // Soft wrap
        if (p.x < -30) p.x = this.canvasWidth + 30;
        else if (p.x > this.canvasWidth + 30) p.x = -30;
        if (p.y < -30) p.y = this.canvasHeight + 30;
        else if (p.y > this.canvasHeight + 30) p.y = -30;

        // Pulse
        const pulse = Math.sin(this.time * 3.5 + p.phase) * 0.4 + 1;
        p.radius = p.baseRadius * pulse;
        p.currentOpacity = p.opacity * (0.5 + Math.sin(this.time * 2.5 + p.phase) * 0.5);
      }

      // Draw tendril connections
      for (let i = 0; i < this.particles.length; i++) {
        const a = this.particles[i];
        for (let j = i + 1; j < this.particles.length; j++) {
          const b = this.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;

          // Quick distance check before sqrt
          if (Math.abs(dx) > connectionDist || Math.abs(dy) > connectionDist) continue;

          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= connectionDist) continue;

          const strength = 1 - dist / connectionDist;
          const avgPhase = (a.phase + b.phase) / 2;
          const pulseStrength = (Math.sin(this.time * 2.5 + avgPhase) * 0.3 + 0.7) * strength;

          // Bezier control point offset perpendicular to the line
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const curvature = 0.08 * Math.sin(this.time * 0.8 + avgPhase);
          const cpx = mx + (-dy) * curvature;
          const cpy = my + dx * curvature;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);

          // Both nodes = brighter, one node = medium, no nodes = dimmer
          const nodeBoost = (a.isNode ? 1 : 0) + (b.isNode ? 1 : 0);
          const baseAlpha = 0.04 + nodeBoost * 0.04;

          ctx.strokeStyle = `rgba(0, 170, 255, ${pulseStrength * baseAlpha + pulseStrength * 0.06})`;
          ctx.lineWidth = strength * (1 + nodeBoost * 0.5);
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of this.particles) {
        // Node glow halo
        if (p.isNode) {
          const glowSize = p.radius * 6;
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
          glow.addColorStop(0, `rgba(0, 160, 255, ${p.currentOpacity * 0.2})`);
          glow.addColorStop(0.4, `rgba(0, 120, 255, ${p.currentOpacity * 0.08})`);
          glow.addColorStop(1, 'rgba(0, 80, 255, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isNode
          ? `rgba(0, 210, 255, ${p.currentOpacity})`
          : `rgba(0, 170, 255, ${p.currentOpacity * 0.8})`;
        ctx.fill();

        // Tiny bright center on nodes
        if (p.isNode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 230, 255, ${p.currentOpacity * 0.6})`;
          ctx.fill();
        }
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    this.animationFrameId = requestAnimationFrame(draw);
  }
}
