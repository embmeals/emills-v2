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
    title: 'Homelab Media Infrastructure',
    type: 'case-study',
    year: '2026',
    description:
      'Multi-machine media server pipeline spanning macOS, Windows, and Linux with automated downloads, cross-network sync, and self-healing monitoring.',
    techStack: ['Docker', 'Python', 'Bash', 'Cloudflare', 'Plex', 'Syncthing'],
    caseStudy: {
      problem:
        'Needed a self-hosted media pipeline that could handle VPN-protected downloads on Windows, cross-network file sync to a Mac server, automated library management, and remote access — all without cloud dependencies.',
      approach:
        'Built a three-machine architecture: Windows PC as a VPN-protected download relay, Mac as the central server running Plex, Radarr, Sonarr, and 12+ Docker services, with Syncthing bridging file transfers. Added Cloudflare Tunnel for secure remote access, a Python monitoring daemon with auto-remediation, and automated weekly backups.',
      outcome:
        'Fully automated media pipeline from request to playback. Self-healing monitor catches and remediates issues before they affect service. Infrastructure serves multiple devices including a 4K TV with direct play, all managed through web UIs accessible anywhere via Cloudflare Tunnel with Access protection.',
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
    title: 'Spectrum Scheduling API',
    type: 'case-study',
    year: '2025',
    description: 'Legacy scheduling API rescue and stabilization for construction workforce management.',
    techStack: ['C#', '.NET', 'SQL Server', 'REST API', 'Azure DevOps'],
    caseStudy: {
      problem: 'Inherited a legacy .NET scheduling API that was silently failing. Broad try-catch blocks were swallowing exceptions across the codebase, masking bugs in third-party API integrations and date logic. The application appeared functional but was producing incorrect data.',
      approach: 'Systematically removed blanket exception swallowing and replaced it with targeted .NET error handling that surfaced the real issues. Traced failures through service layers for phases, roles, and needs scheduling. Fixed date validation logic and bulk data processing bugs that had been hidden.',
      outcome: 'Transformed an unreliable, silently-failing system into one with proper error visibility and correct data processing. Bulk job imports went from a hidden failure state to 100% verified success rate with detailed error reporting.',
    },
  },
  {
    title: 'Bridgit Integration',
    type: 'case-study',
    year: '2025',
    description: 'Third-party API integration for construction workforce scheduling.',
    techStack: ['C#', '.NET', 'REST API', 'Third-party API'],
    caseStudy: {
      problem: 'Integrating with Bridgit\'s scheduling API required handling complex date logic where "go back" dates must always precede end dates, with various edge cases around scheduling phases and role assignments.',
      approach: 'Built dedicated service layers for scheduling phases and roles with careful date validation. Implemented go-back date logic that correctly handles the temporal relationships between scheduling events.',
      outcome: 'Reliable bi-directional sync with Bridgit API, with proper error handling and date validation that prevents invalid scheduling states.',
    },
  },
];
