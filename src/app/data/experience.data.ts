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
      'Lead development on a C# scheduling API, building bulk import/update endpoints and integrating with Bridgit for construction workforce planning',
      'Built and maintained React and Next.js components across enterprise apps, keeping everything WCAG 2.1 accessible',
      'Set up the Bridgit testing environment so the team could run reliable end-to-end tests against real scheduling data',
      'Wrote Python scripts to automate monthly and yearly report generation, cross-checking output against SQL records and historical data',
      'Built full-stack features for OneShop\'s broadcast platform in React and Django, working across both the UI and the data layer',
      'Managed Docker-based local and staging environments and contributed to CI/CD pipelines with GitHub Actions',
      'Created Playwright test suites across multiple projects, using screenshots and scripted flows to catch regressions',
    ],
  },
  {
    role: '.NET Developer',
    company: 'Pryor Learning',
    startDate: 'Dec 2021',
    endDate: 'Jan 2025',
    accomplishments: [
      'Migrated an ASP.NET 4 app to .NET 6, rewriting legacy modules and modernizing the stack',
      'Built learning path portals with ASP.NET Core and Kendo UI, then migrated the frontend from Angular to Vue.js',
      'Replaced jQuery components with Vue.js, shrinking the frontend bundle and making the codebase easier to maintain',
      'Led the frontend accessibility effort, adding WCAG 2.1 compliance and ARIA support across key user flows',
      'Integrated the LMS with Salesforce to sync enrollments, completions, purchases, and seminar schedules via SQL Server',
      'Built and documented Web API endpoints in Postman and Swagger for internal teams and external partners',
      'Automated email notifications for learning events using Hangfire background jobs in C# .NET',
    ],
  },
  {
    role: 'Contract .NET Developer',
    company: 'Rose International',
    startDate: 'Jul 2017',
    endDate: 'Apr 2020',
    accomplishments: [
      'Built and maintained features for a multitenant ASP.NET MVC recruiting platform, working across C# and JavaScript',
      'Developed and consumed REST APIs to connect with third-party job board and applicant tracking integrations',
      'Refactored legacy code around SOLID principles to reduce tech debt and make the codebase easier to extend',
      'Built admin dashboards with Kendo UI grids so internal teams could manage candidate and job listing data',
      'Added tenant-specific customizations to support different recruiting workflows across client organizations',
    ],
  },
];
