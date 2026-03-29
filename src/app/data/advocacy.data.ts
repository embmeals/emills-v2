export interface AdvocacyLink {
  readonly label: string;
  readonly url: string;
  readonly description: string;
}

export interface AdvocacyPoint {
  readonly heading: string;
  readonly body: string;
  readonly color: 'cyan' | 'magenta' | 'amber';
}

export const ADVOCACY_INTRO = `In the early 2000s, I was a lesbian kid in the Midwest with no roadmap. When I came out, my family didn't take it well\u2014and at that age, in those formative years, rejection from the people who are supposed to love you leaves a mark. But the internet gave me somewhere else to turn. Forums, LiveJournal, early social platforms\u2014these were the spaces where I first found people like me existing openly, talking honestly, building community. I didn't find acceptance at home. I didn't find it at school. I found it online, on a web that was free enough to let us exist.

My family has come around since then. But I never forget that during the years I needed it most, it was strangers on the internet\u2014not institutions, not family\u2014who showed me I wasn't broken. That's what the open internet does. It gives people a lifeline when the world around them won't.

That lifeline exists because of Section 230 of the Communications Decency Act. It's a single sentence of law that says platforms aren't liable for what their users post, and that they can moderate content without becoming legally responsible for everything on their site. That's it. It's the legal foundation that made forums, social media, comment sections, and every user-generated space on the internet possible.

Now both parties in Congress want it gone\u2014for contradictory reasons. And the people who will pay the price aren't tech CEOs. They're us.`;

export const ADVOCACY_POINTS: readonly AdvocacyPoint[] = [
  {
    heading: 'Repeal doesn\'t punish Big Tech\u2014it entrenches it',
    body: 'Without Section 230, every platform faces unlimited liability for user posts. Meta and Google can afford buildings full of lawyers. The indie forum where trans teens find community cannot. Small platforms die first. The giants consolidate power. As Techdirt has documented for years, killing Section 230 is a gift to monopolies dressed up as accountability.',
    color: 'cyan',
  },
  {
    heading: 'Platforms will over-moderate\u2014and marginalized voices go first',
    body: 'When platforms face liability for user speech, they don\'t carefully review content\u2014they nuke anything remotely controversial. We already know whose speech gets flagged as "controversial" first: LGBTQ+ people, sex workers, Black activists, anyone outside the mainstream. In 2025, Instagram was caught suppressing dozens of LGBTQ+ hashtags from teen accounts by default. That\'s the future of the entire internet without Section 230.',
    color: 'magenta',
  },
  {
    heading: 'We already ran this experiment\u2014it was a disaster',
    body: 'FOSTA-SESTA carved the first hole in Section 230 in 2018, supposedly to fight trafficking. The result: platforms mass-deleted sex worker communities, harm reduction resources vanished, and trafficking victims became harder to find and help. Over 70 civil rights, LGBTQ+, and human rights organizations warned Congress this would happen. It happened anyway. Every new proposal to "reform" Section 230 follows the same playbook.',
    color: 'amber',
  },
  {
    heading: 'The real agenda is censorship',
    body: 'Bills like KOSA and the SCREEN Act use "protecting children" as cover to mandate content filtering that suppresses LGBTQ+ and reproductive health information. Groups like the Heritage Foundation have made Section 230 repeal a core policy goal. This isn\'t about safety. It\'s about controlling what people\u2014especially young people\u2014are allowed to see and who they\'re allowed to become.',
    color: 'magenta',
  },
] as const;

export interface FalseVictory {
  readonly heading: string;
  readonly surface: string;
  readonly reality: string;
}

export const FALSE_VICTORIES: readonly FalseVictory[] = [
  {
    heading: 'The Meta addiction trial',
    surface: 'In 2025, a jury found Meta\'s platforms harmful to children. It looked like accountability. Headlines celebrated.',
    reality: 'Meta has spent years and millions lobbying to dismantle Section 230\u2014not because it would hurt them, but because they know it would wipe out their competition. Meta spent a record $8 million on lobbying in Q1 2025 alone. They ran ads across Washington urging Congress to "reform" Section 230 at the very moment Frances Haugen was testifying against them. Zuckerberg understands that without Section 230, Meta survives and everyone smaller doesn\'t. The trial isn\'t a loss for Meta\u2014it\'s part of the playbook.',
  },
  {
    heading: 'Police body cameras',
    surface: 'After Michael Brown was killed in Ferguson in 2014, body cameras were championed as a reform\u2014a tool to hold police accountable and protect Black lives.',
    reality: 'Police departments and their corporate vendors had been trying to fund mass body camera adoption for years and couldn\'t get the budgets approved. Ferguson gave them the political cover they needed. Companies like Axon, who had marketed cameras to police as evidence-gathering and surveillance tools, rebranded overnight as accountability technology. The result: one of the most expensive expansions of police surveillance infrastructure in history, funded by the very communities demanding reform. Body camera footage is routinely used to prosecute civilians and is almost never used against officers. The cameras serve the institution, not the people.',
  },
] as const;

export const ADVOCACY_CLOSING = `Section 230 turned 30 in February 2026. It remains the single most important law protecting users' speech online. Not platforms' speech\u2014yours. The kid in a conservative town who needs to know they're not alone. The activist documenting police violence. The small community that can't survive a single lawsuit. That's who loses when this law dies.

I'm not a policy expert. I'm a software engineer who builds things on the web. But I know what the open internet gave me, and I know what's at stake if we let people who've never needed it decide to take it away.`;

export const ADVOCACY_LINKS: readonly AdvocacyLink[] = [
  {
    label: 'Techdirt \u2014 Section 230 Coverage',
    url: 'https://www.techdirt.com/tag/section-230/',
    description: 'Mike Masnick\'s essential, ongoing coverage of Section 230 law and policy',
  },
  {
    label: 'Taylor Lorenz \u2014 User Mag',
    url: 'https://www.usermag.co/',
    description: 'Independent tech journalism covering internet culture, policy, and platform power',
  },
  {
    label: 'EFF \u2014 Section 230',
    url: 'https://www.eff.org/issues/cda230',
    description: 'The Electronic Frontier Foundation\'s resource hub on Section 230 defense',
  },
  {
    label: 'Fight for the Future',
    url: 'https://www.fightforthefuture.org/',
    description: 'Digital rights advocacy and action campaigns',
  },
] as const;
