export interface Skill {
  readonly name: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly color: 'cyan' | 'magenta' | 'amber';
  readonly skills: readonly Skill[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: 'Languages',
    color: 'cyan',
    skills: [
      { name: 'C#' }, { name: 'Python' }, { name: 'JavaScript' },
      { name: 'TypeScript' }, { name: 'SQL' }, { name: 'PHP' },
    ],
  },
  {
    name: 'Frontend',
    color: 'magenta',
    skills: [
      { name: 'React' }, { name: 'Vue.js' }, { name: 'Next.js' },
      { name: 'Angular' }, { name: 'Tailwind CSS' }, { name: 'Bootstrap' },
      { name: 'HTML5' }, { name: 'CSS3' },
    ],
  },
  {
    name: 'Backend',
    color: 'amber',
    skills: [
      { name: '.NET' }, { name: 'ASP.NET' }, { name: 'Django' },
      { name: 'REST' }, { name: 'GraphQL' },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    color: 'cyan',
    skills: [
      { name: 'Docker' }, { name: 'Linux' }, { name: 'Azure DevOps' },
      { name: 'GitHub Actions' }, { name: 'Cloudflare' }, { name: 'Nginx' },
    ],
  },
  {
    name: 'Tools',
    color: 'magenta',
    skills: [
      { name: 'VS Code' }, { name: 'Visual Studio' }, { name: 'Git' },
      { name: 'Jira' }, { name: 'Confluence' }, { name: 'Salesforce' },
    ],
  },
];
