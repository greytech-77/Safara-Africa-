// Pre-launch check: `npm run check:launch`. Exits with code 1 while any blocker remains.
import { launchIssues } from '@/lib/launch-check';

const issues = launchIssues();
const blockers = issues.filter((i) => i.level === 'blocker');
const warnings = issues.filter((i) => i.level === 'warning');

for (const i of blockers) console.log(`✗ ${i.message}`);
for (const i of warnings) console.log(`! ${i.message}`);
console.log(`\n${blockers.length} blocker(s), ${warnings.length} warning(s).`);
if (blockers.length > 0) process.exit(1);
console.log('Ready to launch.');
