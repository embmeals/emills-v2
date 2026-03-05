export type ProjectType = 'public' | 'case-study';

interface CaseStudy {
  readonly problem: string;
  readonly approach: string;
  readonly outcome: string;
}

interface PublicProject {
  readonly title: string;
  readonly type: 'public';
  readonly description: string;
  readonly techStack: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
}

interface CaseStudyProject {
  readonly title: string;
  readonly type: 'case-study';
  readonly description: string;
  readonly techStack: readonly string[];
  readonly caseStudy: CaseStudy;
}

export type Project = PublicProject | CaseStudyProject;
export type { CaseStudyProject };

export const PROJECTS: readonly Project[] = [
  {
    title: 'C# URL Validator',
    type: 'public',
    description: 'Console application that validates URLs and checks HTTP response status codes with comprehensive error handling.',
    techStack: ['C#', '.NET'],
    githubUrl: 'https://github.com/embmeals/URLValidator',
  },
  {
    title: 'React & .NET Task Manager',
    type: 'public',
    description: 'Full-stack task management application with React frontend and .NET API backend, featuring CRUD operations and real-time updates.',
    techStack: ['React', '.NET', 'REST API', 'SQL Server'],
    githubUrl: 'https://github.com/embmeals/TaskManagementAPI',
    liveUrl: 'https://task-management-frontend-swart-five.vercel.app',
  },
  {
    title: 'Spectrum Scheduling API',
    type: 'case-study',
    description: 'Enterprise scheduling system integration for workforce management.',
    techStack: ['C#', '.NET', 'SQL Server', 'REST API', 'Azure DevOps'],
    caseStudy: {
      problem: 'Needed to build a robust scheduling system that integrates with third-party APIs for workforce allocation, handling complex date logic and bulk data processing across multiple service layers.',
      approach: 'Designed a layered .NET service architecture with dedicated services for phases, roles, and needs. Implemented a bulk job import pipeline with comprehensive validation, error reporting, and template-based processing.',
      outcome: 'Achieved 100% success rate on bulk job imports after iterative improvements. The system reliably processes scheduling data with detailed error reporting and handles edge cases in date validation.',
    },
  },
  {
    title: 'Bridgit Integration',
    type: 'case-study',
    description: 'Third-party API integration for construction workforce scheduling.',
    techStack: ['C#', '.NET', 'REST API', 'Third-party API'],
    caseStudy: {
      problem: 'Integrating with Bridgit\'s scheduling API required handling complex date logic where "go back" dates must always precede end dates, with various edge cases around scheduling phases and role assignments.',
      approach: 'Built dedicated service layers for scheduling phases and roles with careful date validation. Implemented go-back date logic that correctly handles the temporal relationships between scheduling events.',
      outcome: 'Reliable bi-directional sync with Bridgit API, with proper error handling and date validation that prevents invalid scheduling states.',
    },
  },
  {
    title: 'Bulk Job Import System',
    type: 'case-study',
    description: 'High-volume job processing pipeline with template-based validation.',
    techStack: ['C#', '.NET', 'SQL Server', 'Background Services'],
    caseStudy: {
      problem: 'Needed to import large batches of jobs from templates with varying formats, handling validation errors gracefully and providing detailed feedback on each job\'s import status.',
      approach: 'Built a validation pipeline that processes jobs against templates, with per-job error tracking and a results summary showing success rates. Used immutable data patterns and comprehensive error handling throughout.',
      outcome: 'Went from 10% success rate (9/10 failures) to 100% success rate on bulk imports. The system processes batches of 10+ jobs with detailed reporting on new vs. existing records.',
    },
  },
];
