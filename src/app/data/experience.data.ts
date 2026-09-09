export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly accomplishments: readonly string[];
}

export const EXPERIENCES: readonly Experience[] = [
  {
    role: 'Senior .NET React Developer',
    company: 'Integrity',
    startDate: 'Jan 2025',
    endDate: 'Present',
    accomplishments: [
      'Migrated a production API from .NET Core 3.1 to .NET 8 with a zero-downtime Azure cutover',
      'Led a C# scheduling API with bulk endpoints, integrating with Bridgit and PINS',
      'Built accessible React/Next.js components across enterprise apps (WCAG 2.1)',
      'Set up end-to-end testing against real scheduling data',
      'Automated report generation with Python, cross-checked against SQL',
      'Built full-stack features for OneShop\'s broadcast platform (React + Django)',
      'Managed Docker environments and GitHub Actions CI/CD',
      'Created Playwright test suites to catch regressions',
    ],
  },
  {
    role: '.NET Developer',
    company: 'Pryor Learning',
    startDate: 'Dec 2021',
    endDate: 'Jan 2025',
    accomplishments: [
      'Migrated ASP.NET 4 to .NET 6, modernizing legacy modules',
      'Built learning portals with ASP.NET Core + Kendo UI; migrated frontend to Vue.js',
      'Replaced jQuery with Vue.js, shrinking the bundle',
      'Led frontend accessibility (WCAG 2.1 + ARIA)',
      'Integrated LMS with Salesforce via SQL Server',
      'Built and documented Web APIs (Postman + Swagger)',
      'Automated email notifications with Hangfire background jobs',
    ],
  },
  {
    role: 'Contract .NET Developer',
    company: 'Rose International',
    startDate: 'Jul 2017',
    endDate: 'Apr 2020',
    accomplishments: [
      'Built features for a multitenant ASP.NET MVC recruiting platform',
      'Developed REST APIs for job board and ATS integrations',
      'Refactored legacy code around SOLID principles',
      'Built admin dashboards with Kendo UI grids',
      'Added tenant-specific customizations for client workflows',
    ],
  },
];
