import { defineConfig } from 'vitest/config';

const isStrykerRun = process.env.NODE_ENV === 'mutation';

export default defineConfig({
   test: {
      globals: true,
      environment: "node",
      exclude: isStrykerRun ? [
      ] : [
         '**/coverage/**',
         '**/build/**',
         '**/node_modules/**',
         '**/.git/**',
         '**/*.git',
      ],
      include: [
         '**/*.micro.ts',
         '**/*.integration.ts',
      ], // Include test files with custom extensions
      // globalSetup: [
      //    './beforeAllTests.ts',
      // ],
      // setupFiles: [
      //    './beforeAllTests.ts',
      // ],
      coverage: {
         exclude: [
            'build',
            'node_modules',
            'esbuild.config.ts',
            'vitest.config.ts',
            'vitest.integration.config.ts',
            'vitest.micro.config.ts',
            '**/*.integration.ts',
            '**/*.micro.ts',
         ],
         reporter: ['text', 'html'], // Add desired reporters
         // thresholds: {
         //    global: {
         //       statements: 90,
         //       branches: 90,
         //       functions: 90,
         //       lines: 90
         //    },
         //    each: {
         //       statements: 90,
         //       branches: 90,
         //       functions: 90,
         //       lines: 90
         //    },
         // },
         // reportOnFailure: true,
      },
   },
   resolve: {
      alias: {}
   }
});
