export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly accomplishments: readonly string[];
}

export const EXPERIENCES: readonly Experience[] = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Current Position',
    startDate: '2022',
    endDate: 'Present',
    accomplishments: [
      'Building and maintaining full-stack .NET applications with Angular frontends',
      'Integrating third-party APIs for workforce scheduling and management',
      'Implementing bulk data processing pipelines with comprehensive error handling',
      'Automating workflows with GitHub Actions and Azure DevOps CI/CD pipelines',
    ],
  },
  {
    role: 'Full Stack .NET Developer',
    company: 'Previous Role',
    startDate: '2019',
    endDate: '2022',
    accomplishments: [
      'Developed and maintained CMS-integrated web applications',
      'Built RESTful APIs and microservices using .NET and SQL Server',
      'Implemented responsive, accessible frontends with modern frameworks',
      'Collaborated with cross-functional teams in Agile/Scrum environments',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Early Career',
    startDate: '2017',
    endDate: '2019',
    accomplishments: [
      'Created custom websites and landing pages for clients',
      'Gained foundational experience with HTML, CSS, JavaScript, and PHP',
      'Developed WordPress themes and plugins for content management',
    ],
  },
];
