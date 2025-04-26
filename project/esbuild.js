const esbuild = require('esbuild');
const stylePlugin = require('esbuild-style-plugin');

const external = [
  "narraleaf-react",
  "react/jsx-runtime",
  "react",
  "react-dom",
];

const alias = {
  '@': './src',
};

const common = {
  alias,
  bundle: true,
  logLevel: 'info',
  external,
  platform: 'browser',
  minify: true,
  metafile: true,
  sourcemap: true,
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [
          require('@tailwindcss/postcss'),
          require('autoprefixer')
        ]
      },
    }),
  ],
}

Promise.all([
  esbuild.build({
    ...common,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    outfile: 'dist/index.mjs',
    sourcemap: true,
    target: 'node22'
  }),
  esbuild.build({
    ...common,
    entryPoints: ['src/index.ts'],
    format: 'cjs',
    outfile: 'dist/index.cjs',
    sourcemap: true,
    target: 'node22'
  }),
]).catch(() => process.exit(1));
