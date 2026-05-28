export interface Skill {
  readonly name: string;
  readonly icon?: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly color: 'cyan' | 'magenta' | 'amber' | 'green' | 'violet';
  readonly skills: readonly Skill[];
}

const icon = (file: string) => `assets/icons/skills/${file}.svg`;

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: 'Languages',
    color: 'cyan',
    skills: [
      { name: 'C#', icon: icon('c-sharp') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'JavaScript', icon: icon('javascript') },
      { name: 'Python', icon: icon('python') },
      { name: 'SQL' },
      { name: 'PHP', icon: icon('php') },
    ],
  },
  {
    name: 'Frontend',
    color: 'magenta',
    skills: [
      { name: 'React', icon: icon('react') },
      { name: 'Angular', icon: icon('angular') },
      { name: 'Next.js' },
      { name: 'Vue.js', icon: icon('vuejs') },
      { name: 'Tailwind CSS', icon: icon('tailwind-css') },
      { name: 'Kendo UI' },
      { name: 'Bootstrap', icon: icon('bootstrap') },
      { name: 'HTML5', icon: icon('html5') },
      { name: 'CSS3', icon: icon('css3') },
    ],
  },
  {
    name: 'Backend',
    color: 'amber',
    skills: [
      { name: '.NET', icon: icon('net') },
      { name: 'ASP.NET', icon: icon('net') },
      { name: 'Entity Framework' },
      { name: 'Django' },
      { name: 'REST' },
      { name: 'GraphQL', icon: icon('graphql') },
      { name: 'Hangfire' },
      { name: 'MongoDB', icon: icon('mongodb') },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    color: 'green',
    skills: [
      { name: 'GitHub Actions', icon: icon('github-actions') },
      { name: 'Docker', icon: icon('docker') },
      { name: 'Azure DevOps', icon: icon('azure-devops') },
      { name: 'AWS' },
      { name: 'Linux', icon: icon('linux') },
      { name: 'Cloudflare', icon: icon('cloudflare') },
      { name: 'CI/CD' },
      { name: 'Nginx' },
    ],
  },
  {
    name: 'Tools & Standards',
    color: 'violet',
    skills: [
      { name: 'WCAG 2.1' },
      { name: 'ARIA' },
      { name: 'SOLID' },
      { name: 'Postman', icon: icon('postman') },
      { name: 'Swagger', icon: icon('swagger') },
      { name: 'Auth0', icon: icon('auth0') },
      { name: 'Git', icon: icon('git') },
      { name: 'Jira', icon: icon('jira') },
      { name: 'Salesforce' },
    ],
  },
];
