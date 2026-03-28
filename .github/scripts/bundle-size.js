// Posts (or updates) a bundle size comment on a pull request.
// Called from deploy.yml via actions/github-script.
module.exports = async ({ github, context }) => {
  const fs = require('fs');
  const path = require('path');

  const DIST = 'dist/emills-v2/browser';

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFiles = (ext) =>
    fs.readdirSync(DIST)
      .filter((f) => f.endsWith(ext))
      .map((f) => ({ name: f, size: fs.statSync(path.join(DIST, f)).size }))
      .sort((a, b) => b.size - a.size);

  const table = (files) => {
    const rows = files.map((f) => `| \`${f.name}\` | ${formatBytes(f.size)} |`).join('\n');
    const total = files.reduce((sum, f) => sum + f.size, 0);
    return `| File | Size |\n|------|------|\n${rows}\n| **Total** | **${formatBytes(total)}** |`;
  };

  const body = [
    '## Bundle Size Report',
    '',
    '### JavaScript',
    table(getFiles('.js')),
    '',
    '### CSS',
    table(getFiles('.css')),
    '',
    `> Built from commit \`${context.sha.slice(0, 7)}\``,
  ].join('\n');

  const { data: comments } = await github.rest.issues.listComments({
    ...context.repo,
    issue_number: context.issue.number,
  });

  const existing = comments.find(
    (c) => c.user.login === 'github-actions[bot]' && c.body.startsWith('## Bundle Size Report'),
  );

  if (existing) {
    await github.rest.issues.updateComment({ ...context.repo, comment_id: existing.id, body });
  } else {
    await github.rest.issues.createComment({ ...context.repo, issue_number: context.issue.number, body });
  }
};
