export interface FunFact {
  readonly label: string;
  readonly icon: string;
  readonly color: 'cyan' | 'magenta' | 'amber';
}

export const ABOUT_TEXT = `Hello! I'm Ember Mills, a Senior Full Stack Engineer who loves building things that live on the web. My passion for web development started back in 2004, when I hacked together custom MySpace page themes. That hands-on tinkering helped me with the beginning fundamentals of HTML and CSS.

Fast-forward to today: I've spent the past six years building and maintaining full-stack .NET applications, integrating CMS solutions, and automating workflows with modern DevOps tools. My current focus is on crafting inclusive, accessible digital experiences that delight users and stand up to real-world demands.`;

export const FUN_FACTS: readonly FunFact[] = [
  { label: 'Amateur Artist', icon: '\u{1F3A8}', color: 'magenta' },
  { label: 'Proud Pomchi Parent', icon: '\u{1F415}', color: 'amber' },
  { label: 'Avid Gamer', icon: '\u{1F3AE}', color: 'cyan' },
  { label: 'Virgo', icon: '\u264D', color: 'magenta' },
  { label: 'Lover of Bicycles', icon: '\u{1F6B2}', color: 'cyan' },
];
