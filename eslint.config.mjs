import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Compiler rules new in eslint-config-next 16. They flag existing, working effects
    // (MegaMenu, MobileMenu, MonthPicker, TourGrid). Kept as warnings until those are refactored;
    // see docs/02-restructure-report.md.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '_archive/**']),
]);
