// Deletes branches that have been fully merged into main.
// Handles pagination and detects squash/rebase merges via closed PRs.
// Called from stale-branches.yml via actions/github-script.
module.exports = async ({ github, context }) => {
  const PROTECTED = ['main', 'development'];

  const branches = await github.paginate(github.rest.repos.listBranches, {
    ...context.repo,
    per_page: 100,
  });

  for (const { name } of branches) {
    if (PROTECTED.includes(name)) continue;

    try {
      // Primary check: look for a closed, merged PR from this branch into main.
      const { data: prs } = await github.rest.pulls.list({
        ...context.repo,
        state: 'closed',
        head: `${context.repo.owner}:${name}`,
        base: 'main',
        per_page: 1,
      });

      const wasMerged = prs.some((pr) => pr.merged_at !== null);

      // Fallback: fast-forward check catches regular merge commits.
      if (!wasMerged) {
        const { data: compare } = await github.rest.repos.compareCommitsWithBasehead({
          ...context.repo,
          basehead: `${name}...main`,
        });
        if (compare.ahead_by !== 0) continue;
      }

      await github.rest.git.deleteRef({ ...context.repo, ref: `heads/${name}` });
      console.log(`Deleted: ${name}`);
    } catch (e) {
      console.log(`Skipping ${name}: ${e.message}`);
    }
  }
};
