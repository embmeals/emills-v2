export interface Skill {
  readonly name: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly color: 'cyan' | 'magenta' | 'amber' | 'green' | 'violet';
  readonly skills: readonly Skill[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: 'Languages',
    color: 'cyan',
    skills: [
      { name: 'C#' }, { name: 'TypeScript' }, { name: 'JavaScript' },
      { name: 'Python' }, { name: 'SQL' }, { name: 'PHP' },
    ],
  },
  {
    name: 'Frontend',
    color: 'magenta',
    skills: [
      { name: 'React' }, { name: 'Angular' }, { name: 'Next.js' },
      { name: 'Vue.js' }, { name: 'Tailwind CSS' }, { name: 'Kendo UI' },
      { name: 'Bootstrap' }, { name: 'HTML5' }, { name: 'CSS3' },
    ],
  },
  {
    name: 'Backend',
    color: 'amber',
    skills: [
      { name: '.NET' }, { name: 'ASP.NET' }, { name: 'Entity Framework' },
      { name: 'Django' }, { name: 'REST' }, { name: 'GraphQL' },
      { name: 'Hangfire' }, { name: 'MongoDB' },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    color: 'green',
    skills: [
      { name: 'GitHub Actions' }, { name: 'Docker' }, { name: 'Azure DevOps' },
      { name: 'AWS' }, { name: 'Linux' }, { name: 'Cloudflare' },
      { name: 'CI/CD' }, { name: 'Nginx' },
    ],
  },
  {
    name: 'Tools & Standards',
    color: 'violet',
    skills: [
      { name: 'WCAG 2.1' }, { name: 'ARIA' }, { name: 'SOLID' },
      { name: 'Postman' }, { name: 'Swagger' }, { name: 'Auth0' },
      { name: 'Git' }, { name: 'Jira' }, { name: 'Salesforce' },
    ],
  },
];
