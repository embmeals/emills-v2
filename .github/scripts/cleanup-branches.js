// Deletes branches that have been fully merged into main.
// Called from stale-branches.yml via actions/github-script.
module.exports = async ({ github, context }) => {
  const PROTECTED = ['main', 'development'];

  const { data: branches } = await github.rest.repos.listBranches({
    ...context.repo,
    per_page: 100,
  });

  for (const { name } of branches) {
    if (PROTECTED.includes(name)) continue;

    try {
      const { data: compare } = await github.rest.repos.compareCommitsWithBasehead({
        ...context.repo,
        basehead: `${name}...main`,
      });

      if (compare.ahead_by === 0) {
        await github.rest.git.deleteRef({ ...context.repo, ref: `heads/${name}` });
        console.log(`Deleted: ${name}`);
      }
    } catch (e) {
      console.log(`Skipping ${name}: ${e.message}`);
    }
  }
};
