import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'assets', 'icons', 'skills');
mkdirSync(outDir, { recursive: true });

// Map skill names to developer-icons export names (no "Icon" suffix)
const SKILL_ICON_MAP = {
  // Languages
  'C#': 'CSharp',
  'TypeScript': 'TypeScript',
  'JavaScript': 'JavaScript',
  'Python': 'Python',
  'SQL': 'MicrosoftSQLServer',
  'PHP': 'PHP',
  // Frontend
  'React': 'React',
  'Angular': 'Angular',
  'Next.js': 'NextJs',
  'Vue.js': 'VueJs',
  'Tailwind CSS': 'TailwindCSS',
  'Bootstrap': 'Bootstrap5',
  'HTML5': 'HTML5',
  'CSS3': 'CSS3',
  // Backend
  '.NET': 'CSharp',
  'Django': 'Django',
  'GraphQL': 'GraphQL',
  'MongoDB': 'MongoDB',
  // DevOps
  'Docker': 'Docker',
  'AWS': 'AWS',
  'Linux': 'Linux',
  'Cloudflare': 'Cloudflare',
  'GitHub Actions': 'GitHubLight',
  'Azure DevOps': 'Azure',
  // Tools
  'Postman': 'Postman',
  'Swagger': 'Swagger',
  'Auth0': 'Auth0',
  'Git': 'Git',
  'Jira': 'Jira',
};


async function main() {
  const icons = await import('developer-icons');

  let extracted = 0;
  for (const [skillName, exportName] of Object.entries(SKILL_ICON_MAP)) {
    if (!exportName) {
      console.log(`⏭ ${skillName}: no matching icon`);
      continue;
    }

    const IconComponent = icons[exportName];
    if (!IconComponent) {
      console.log(`⚠ ${skillName}: export "${exportName}" not found`);
      continue;
    }

    const svg = renderToStaticMarkup(createElement(IconComponent, { size: 48 }));
    const fileName = skillName
      .toLowerCase()
      .replace(/#/g, '-sharp')
      .replace(/\./g, '')
      .replace(/\+/g, 'plus')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '.svg';
    writeFileSync(join(outDir, fileName), svg);
    console.log(`✓ ${skillName} → ${fileName}`);
    extracted++;
  }

  console.log(`\nExtracted ${extracted} icons to ${outDir}`);
}

main().catch(console.error);
