export type ProjectType = 'public' | 'case-study';

interface CaseStudy {
  readonly problem: string;
  readonly approach: string;
  readonly outcome: string;
}

interface PublicProject {
  readonly title: string;
  readonly type: 'public';
  readonly year: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
}

interface CaseStudyProject {
  readonly title: string;
  readonly type: 'case-study';
  readonly year: string;
  readonly description: string;
  readonly techStack: readonly string[];
  readonly caseStudy: CaseStudy;
  readonly githubUrl?: string;
}

export type Project = PublicProject | CaseStudyProject;
export type { CaseStudyProject };

export const PROJECTS: readonly Project[] = [
  {
    title: 'Homelab Infrastructure Monitor',
    type: 'case-study',
    year: '2026',
    description:
      'Full-stack .NET 10 monitoring dashboard for a multi-machine homelab running 20+ services. Live HTMX dashboard, 9 recurring Hangfire jobs, email alerts, remote VPN control, and auto-deploy via self-hosted GitHub Actions runner.',
    techStack: ['.NET 10', 'Hangfire', 'HTMX', 'EF Core', 'SQLite', 'Chart.js', 'GitHub Actions', 'Cloudflare'],
    githubUrl: 'https://github.com/embmeals/homelabBackend',
    caseStudy: {
      problem:
        'Managing a 3-machine homelab (Mac server, Windows PC, Linux laptop) running Plex, Radarr, Sonarr, 12+ Docker containers, and a VPN-protected download pipeline. Monitoring was scattered across shell scripts and a Python daemon with no central visibility, and issues went unnoticed until they broke something.',
      approach:
        'Built a .NET 10 Hangfire app with a Razor Pages dashboard that monitors all services via HTTP pings and SSH. qBittorrent is VPN-bound and unreachable over LAN, so the app SSHes to the Windows PC to check status and control the download pipeline remotely. HTMX handles live dashboard updates without a JS framework. EF Core with SQLite stores health check history, and a 90-day uptime page shows service reliability over time. CI runs on Ubuntu, deploy via a self-hosted GitHub Actions runner on the Mac — push to main auto-deploys if tests pass.',
      outcome:
        'Single dashboard replaces all monitoring scripts. 42 unit tests. 9 recurring jobs checking services, disks, torrents, Docker containers, DNS, and the Cloudflare tunnel. One-click VPN connect, Plex scan, and service restarts from any device. Email alerts on critical issues. Storage forecast shows when drives will fill up. Accessible anywhere via Cloudflare Tunnel with Access protection.',
    },
  },
  {
    title: 'C# URL Validator',
    type: 'case-study',
    year: '2025',
    description: 'Console tool that validates URLs and checks HTTP status codes, built to verify SEO compliance for job listing indexing.',
    techStack: ['C#', '.NET', 'HTTP', 'SEO'],
    githubUrl: 'https://github.com/embmeals/URLValidator',
    caseStudy: {
      problem: 'Job listings were being indexed by Google when they should not have been. Needed a reliable way to bulk-validate URLs and verify that correct HTTP status codes and noindex directives were being returned.',
      approach: 'Built a C# console application that crawls provided URLs, checks HTTP response status codes, and validates headers for SEO directives. Includes comprehensive error handling for timeouts, redirects, and malformed URLs.',
      outcome: 'Successfully identified and reported URLs with incorrect indexing configurations, enabling the team to fix SEO compliance issues across job listing pages.',
    },
  },
  {
    title: 'React & .NET Task Manager',
    type: 'public',
    year: '2024',
    description: 'Full-stack task management application with React frontend and .NET API backend, featuring CRUD operations and real-time updates.',
    techStack: ['React', '.NET', 'REST API', 'SQL Server'],
    githubUrl: 'https://github.com/embmeals/TaskManagementAPI',
    liveUrl: 'https://task-management-frontend-swart-five.vercel.app',
  },
  {
    title: 'SqueezySwink',
    type: 'public',
    year: '2026',
    description:
      'Marketing website for a St. Louis-based upcycled and screenprinted clothing brand. Static landing page with shop integration via Depop, deployed on Cloudflare Workers.',
    techStack: ['HTML', 'CSS', 'Cloudflare Workers'],
    githubUrl: 'https://github.com/embmeals/SqueezySwinkSite',
    liveUrl: 'https://squeezyswink.com',
  },
  {
    title: 'Construction Scheduling Platform',
    type: 'case-study',
    year: '2025',
    description: 'Legacy API rescue, stabilization, and third-party integration for construction workforce scheduling.',
    techStack: ['C#', '.NET', 'SQL Server', 'REST API', 'Azure DevOps'],
    caseStudy: {
      problem: 'Inherited a legacy .NET scheduling API that was silently failing — broad try-catch blocks swallowed exceptions across the codebase, masking bugs in date logic and bulk data processing. A third-party scheduling integration (Bridgit) also needed to be built with complex temporal relationships between scheduling phases.',
      approach: 'Systematically removed blanket exception swallowing and replaced it with targeted error handling that surfaced real issues. Fixed date validation logic and bulk processing bugs. Built dedicated service layers for the Bridgit integration with go-back date logic that correctly handles phase and role scheduling constraints.',
      outcome: 'Transformed an unreliable system into one with proper error visibility. Bulk imports went from hidden failure to 100% verified success. Delivered reliable bi-directional sync with Bridgit API, preventing invalid scheduling states across the platform.',
    },
  },
];
