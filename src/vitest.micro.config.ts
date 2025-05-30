import { defineConfig } from 'vitest/config';
import vitestBaseConfig from './vitest.config';

export default defineConfig({
   ...vitestBaseConfig,
   test: {
      ...vitestBaseConfig.test,
      include: [
         '**/*.micro.ts',
      ], // Include test files with custom extensions
   },
});
