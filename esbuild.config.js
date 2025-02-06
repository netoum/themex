import esbuild from 'esbuild';
import { execSync } from 'child_process';

// Generate TypeScript types
execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' });

// Build configurations
const builds = [
  { format: 'cjs', minify: true, outfile: 'dist/index.min.js' },  // Minified CJS
  { format: 'esm', minify: true, outfile: 'dist/index.esm.min.js' },  // Minified ESM
  { format: 'cjs', minify: false, outfile: 'dist/index.js' },  // Unminified CJS
  { format: 'esm', minify: false, outfile: 'dist/index.esm.js' },  // Unminified ESM
];

// Run esbuild for each configuration
Promise.all(builds.map(({ format, minify, outfile }) =>
  esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify,
    sourcemap: true,
    target: 'esnext',
    external: [],
    format,
    outfile,
  })
)).catch(() => process.exit(1));