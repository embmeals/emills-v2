export interface AdvocacyLink {
  readonly label: string;
  readonly url: string;
  readonly description: string;
}

export interface AdvocacySource {
  readonly label: string;
  readonly url: string;
}

export interface AdvocacyPoint {
  readonly heading: string;
  readonly body: string;
  readonly color: 'cyan' | 'magenta' | 'amber';
  readonly sources: readonly AdvocacySource[];
}

export const ADVOCACY_INTRO = `In the early 2000s, I was a lesbian kid in the Midwest with no roadmap. When I came out, my family didn't take it well. When you're that age and the people who are supposed to love you reject you, it does something. But the internet gave me somewhere else to go. Forums, LiveJournal, early social platforms. That's where I first found people like me just existing and talking honestly and building community. I didn't find that at home. I didn't find it at school. I found it online, on a web that was open enough to let us exist.

My family has come around since then. But I'll never forget that when I needed it the most, it was strangers on the internet, not my family, not any institution, who showed me I wasn't broken. That's what the open internet does. It gives people a lifeline when nobody else will.

That lifeline exists because of Section 230 of the Communications Decency Act. It's basically one sentence that says platforms aren't liable for what their users post, and that they can moderate content without being on the hook for everything on their site. That's it. It's the legal foundation that made forums, social media, comment sections, and every user-generated space on the internet possible.

Platforms have real problems. They're addictive by design, they harvest data, their algorithms push people toward extremes, and companies like Meta have been genuinely terrible. I'm not here to defend Big Tech. But the push to dismantle Section 230 doesn't fix any of that. Both parties in Congress want it gone, for completely opposite reasons. And the people who are going to pay the price aren't tech CEOs. It's us.`;

export const ADVOCACY_POINTS: readonly AdvocacyPoint[] = [
  {
    heading: 'Repeal doesn\'t punish Big Tech. It entrenches it.',
    body: 'Without Section 230, every platform is on the hook for what users post. Meta and Google can afford buildings full of lawyers. The indie forum where trans teens find community can\'t. Small platforms die first and the giants get bigger. Techdirt has been documenting this for years. Killing Section 230 is a gift to monopolies dressed up as accountability.',
    color: 'cyan',
    sources: [
      { label: 'Techdirt: Section 230 Turns 30', url: 'https://www.techdirt.com/2026/02/09/section-230-turns-30-both-parties-want-it-gone-for-contradictory-reasons/' },
      { label: 'Techdirt: Kill 230, Make Monopolies Worse', url: 'https://www.techdirt.com/2024/05/28/wanna-make-big-tech-monopolies-even-worse-kill-section-230/' },
    ],
  },
  {
    heading: 'When platforms over-moderate, marginalized voices go first',
    body: 'When platforms face liability for user speech, they don\'t carefully review things. They just delete anything that could be controversial. And we already know whose speech gets flagged first: LGBTQ+ people, sex workers, Black activists, basically anyone outside the mainstream. In 2025, Instagram got caught suppressing dozens of LGBTQ+ hashtags from teen accounts by default. That\'s what the whole internet looks like without Section 230.',
    color: 'magenta',
    sources: [
      { label: 'User Mag: Instagram Blocked Teens From LGBTQ Content', url: 'https://www.usermag.co/p/instagram-blocked-teens-from-searching' },
      { label: 'Techdirt: Gutting 230 Harms the Marginalized', url: 'https://www.techdirt.com/2019/08/27/gutting-section-230-will-harm-most-marginalized/' },
    ],
  },
  {
    heading: 'We already tried this. It was a disaster.',
    body: 'FOSTA-SESTA punched the first hole in Section 230 in 2018, supposedly to fight trafficking. What actually happened was platforms mass-deleted sex worker communities, harm reduction resources disappeared, and trafficking victims got harder to find and help. Over 70 civil rights and LGBTQ+ organizations warned Congress this would happen. It happened anyway. Every new proposal to "reform" Section 230 runs the same playbook.',
    color: 'amber',
    sources: [
      { label: '70+ Orgs Warn Congress: Don\'t Gut 230', url: 'https://www.fightforthefuture.org/news/2021-01-27-70-civil-rights-and-social-justice-organizations' },
      { label: 'EFF: FOSTA Is Unconstitutional', url: 'https://www.eff.org/deeplinks/2022/09/fight-overturn-fosta-unconstitutional-internet-censorship-law-continues' },
    ],
  },
  {
    heading: '"Protecting children" is doing a lot of heavy lifting',
    body: 'Bills like KOSA and the SCREEN Act use child safety as the reason to push content filtering that just happens to suppress LGBTQ+ and reproductive health information. The Heritage Foundation has made Section 230 repeal a core policy goal and has said openly that KOSA would be useful for removing trans and abortion content. This isn\'t about keeping kids safe. It\'s about controlling what people, especially young people, are allowed to see and who they get to become.',
    color: 'magenta',
    sources: [
      { label: 'Techdirt: Heritage Admits KOSA Removes Abortion Content', url: 'https://www.techdirt.com/2024/09/16/heritage-foundation-admits-kosa-will-be-useful-for-removing-pro-abortion-content-if-trump-wins/' },
      { label: 'FFTF: LGBTQ+ Activists Say Fight Censorship Bills', url: 'https://www.fightforthefuture.org/news/2025-06-24-lgbtq-activists-fight-trumps-censorship-bills-or-dont-come-to-pride' },
      { label: 'Taylor Lorenz on KOSA and the SCREEN Act', url: 'https://www.privacyguides.org/videos/2025/12/16/taylor-lorenz-on-kosa-the-screen-act-and-repealing-section-230/' },
    ],
  },
] as const;

export interface FalseVictorySource {
  readonly label: string;
  readonly url: string;
}

export interface FalseVictory {
  readonly heading: string;
  readonly surface: string;
  readonly reality: string;
  readonly sources: readonly FalseVictorySource[];
}

export const FALSE_VICTORIES: readonly FalseVictory[] = [
  {
    heading: 'The Meta addiction trial',
    surface: 'In 2025, a jury found Meta\'s platforms harmful to children. It looked like accountability. Headlines celebrated.',
    reality: 'Meta has spent years and millions lobbying to get rid of Section 230. Not because it would hurt them, but because they know it would wipe out their competition. Meta spent a record $8 million on lobbying in Q1 2025 alone. They were running ads all over Washington telling Congress to "reform" Section 230 at the same time Frances Haugen was testifying against them. Zuckerberg knows that without Section 230, Meta survives and everyone smaller doesn\'t. The trial isn\'t a loss for Meta. It\'s part of the playbook.',
    sources: [
      { label: 'Techdirt: Section 230 Turns 30', url: 'https://www.techdirt.com/2026/02/09/section-230-turns-30-both-parties-want-it-gone-for-contradictory-reasons/' },
      { label: 'EFF: Facebook\'s Pitch to Congress', url: 'https://www.eff.org/deeplinks/2021/03/facebooks-pitch-congress-section-230-me-not-thee' },
      { label: 'Issue One: Big Tech Lobbying', url: 'https://issueone.org/articles/big-tech-lobbying-2025-q3/' },
      { label: 'Reason: What the Trial Coverage Left Out', url: 'https://reason.com/podcast/2026/03/27/taylor-lorenz-is-social-media-responsible-for-bad-parenting/' },
      { label: 'FFTF: The Verdict Doesn\'t Mean Pass KOSA', url: 'https://www.fightforthefuture.org/news/2026-03-25-no-the-meta-youtube-lawsuit-verdict-does-not-mean-we-should-pass-kosa-or-repeal-section-230' },
    ],
  },
  {
    heading: 'Police body cameras',
    surface: 'After Michael Brown was killed in Ferguson in 2014, body cameras were championed as a reform, a tool to hold police accountable and protect Black lives.',
    reality: 'Police departments and their corporate vendors had been trying to fund mass body camera adoption for years and couldn\'t get the budgets approved. Ferguson gave them the political cover they needed. Companies like Axon, who had marketed cameras to police as evidence-gathering and surveillance tools, rebranded overnight as accountability technology. The result was one of the most expensive expansions of police surveillance infrastructure in history, funded by the very communities demanding reform. Body camera footage is routinely used to prosecute civilians and is almost never used against officers. The cameras serve the institution, not the people.',
    sources: [
      { label: 'ProPublica: How Police Undermined Body Cameras', url: 'https://www.propublica.org/article/how-police-undermined-promise-body-cameras' },
      { label: 'The Flaw: Axon\'s Reaping', url: 'https://theflaw.org/articles/police-brutality-as-a-moneymaker/' },
      { label: 'Prism Reports: Troubling History of Body Cameras', url: 'https://prismreports.org/2024/07/16/complex-troubling-history-police-body-cameras/' },
    ],
  },
  {
    heading: 'Marriage equality',
    surface: 'In 2015, the Supreme Court legalized same-sex marriage in Obergefell v. Hodges. #LoveWon trended everywhere. The fight was over.',
    reality: 'The movement got funneled into the most assimilationist goal possible. Marriage mostly helped white cisgender gay and lesbian people who already had some upward mobility. The big organizations declared victory, shifted resources, and moved on. Meanwhile trans rights, employment protections, housing discrimination, and healthcare access all got deprioritized. Within a year North Carolina passed its bathroom bill. By 2023, over 600 anti-LGBTQ bills were introduced in state legislatures in a single year, almost all targeting trans people. The movement won the goal that looked most like straight acceptance and left its most vulnerable members exposed. Trans people are now being legislated out of existence while the victory flag still flies.',
    sources: [
      { label: 'Boston Review: Those Left Behind When #LoveWon', url: 'https://www.bostonreview.net/articles/hugh-ryan-love-won/' },
      { label: 'Slate: The Decade LGBTQ Rights Went Mainstream', url: 'https://slate.com/news-and-politics/2019/12/decade-fight-lgbtq-rights-mainstream-marriage-equality-trans-rights.html' },
      { label: 'PBS: What Progress Looks Like 5 Years After Obergefell', url: 'https://www.pbs.org/newshour/nation/lgbtq-activists-on-what-progress-looks-like-5-years-after-same-sex-marriage-ruling' },
    ],
  },
] as const;

export const ADVOCACY_CLOSING = `Section 230 turned 30 in February 2026. It's still the most important law protecting users' speech online. Not platforms' speech. Yours. The kid in a conservative town who needs to know they're not alone. The activist documenting police violence. The small community that can't afford a single lawsuit. That's who loses when this law goes away.

I'm not a policy expert. I'm a software engineer who builds things for the web. But I know what the open internet gave me, and I know what happens when the people who never needed it get to decide to take it away.`;

export const ADVOCACY_LINKS: readonly AdvocacyLink[] = [
  {
    label: 'Fight for the Future',
    url: 'https://www.fightforthefuture.org/',
    description: 'Evan Greer\'s digital rights org leading the fight against KOSA and Section 230 repeal',
  },
  {
    label: 'Techdirt - Section 230 Coverage',
    url: 'https://www.techdirt.com/tag/section-230/',
    description: 'Mike Masnick\'s ongoing coverage of Section 230 law and policy',
  },
  {
    label: 'Taylor Lorenz - User Mag',
    url: 'https://www.usermag.co/',
    description: 'Independent tech journalism on internet culture, policy, and platform power',
  },
  {
    label: 'Cory Doctorow - Pluralistic',
    url: 'https://pluralistic.net/',
    description: 'How monopoly power and enshittification break the internet for everyone',
  },
  {
    label: 'Jillian York - Silicon Values',
    url: 'https://jilliancyork.com/',
    description: 'EFF director on how content moderation disproportionately silences marginalized people',
  },
  {
    label: 'EFF - Section 230',
    url: 'https://www.eff.org/issues/cda230',
    description: 'The Electronic Frontier Foundation\'s resource hub on Section 230 defense',
  },
  {
    label: 'Bad Internet Bills',
    url: 'https://www.badinternetbills.com',
    description: 'Track current legislation threatening the open internet',
  },
] as const;
