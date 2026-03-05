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
      'Technical Lead for spectrum-web-api, a C# application enabling construction job scheduling through third-party integrations including Bridgit',
      'Designed and implemented bulk update and bulk import APIs, streamlining data operations for construction scheduling workflows',
      'Integrated Bridgit testing environment with development infrastructure, enabling reliable end-to-end testing of scheduling features',
      'Maintained and enhanced React/Next.js components for enterprise applications, ensuring WCAG 2.1 accessibility compliance',
      'Deployed and maintained Dockerized applications via Docker Desktop for local and staging environments',
      'Contributed to CI/CD pipelines using GitHub Actions, optimizing build and deployment workflows',
    ],
  },
  {
    role: '.NET Developer',
    company: 'Pryor Learning',
    startDate: 'Dec 2021',
    endDate: 'Jan 2025',
    accomplishments: [
      'Upgraded an ASP.NET 4 application to .NET 6, rewriting legacy modules and reducing page load times by 40%',
      'Developed learning path portals with ASP.NET Core, Vue.js, Kendo UI, and Angular Material',
      'Replaced jQuery components with Vue.js, decreasing frontend bundle size and improving maintainability',
      'Spearheaded frontend accessibility initiative, implementing WCAG 2.1 guidelines and ARIA attributes across key workflows',
      'Authored and maintained Web API endpoints; documented in Postman and Swagger for internal and partner use',
    ],
  },
  {
    role: 'Contract .NET Developer',
    company: 'Rose International',
    startDate: 'Jul 2017',
    endDate: 'Apr 2020',
    accomplishments: [
      'Customized multitenant ASP.NET MVC applications, adding client-specific features using C# and JavaScript',
      'Built and consumed REST APIs for third-party integrations, improving data exchange reliability by 30%',
      'Refactored legacy code to adhere to SOLID principles, reducing technical debt and lowering maintenance costs',
      'Utilized Kendo UI grids to develop intuitive admin dashboards for data accuracy and reporting',
    ],
  },
];
