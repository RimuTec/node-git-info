import { promises as fs } from 'fs';
import path from 'path';

async function triggerTsServerRestart(): Promise<void> {
   const settingsPath = path.resolve('..', '.vscode', 'settings.json');

   try {
      // Read the current settings file
      const rawContent = await fs.readFile(settingsPath, 'utf-8');

      // Remove trailing commas to make it valid JSON temporarily
      const sanitizedContent = rawContent.replace(/,\s*([}\]])/g, '$1');
      let settings: Record<string, any>;

      try {
         settings = JSON.parse(sanitizedContent);
      } catch (parseError: unknown) {
         if (parseError instanceof SyntaxError) {
            console.error(`Invalid JSON in ${settingsPath} after sanitization:`, parseError.message);
         } else {
            console.error(`Unexpected error while parsing JSON:`, parseError);
         }
         process.exit(1);
      }

      // Initialize typescript.tsserver.watchOptions if it doesn't exist
      settings['typescript.tsserver.watchOptions'] =
         settings['typescript.tsserver.watchOptions'] || {};

      // Determine the current watchFile value and toggle it
      const currentWatchFile = settings['typescript.tsserver.watchOptions'].watchFile;
      const newWatchFile =
         currentWatchFile === 'useFsEventsOnParentDirectory' ? 'usePolling' : 'useFsEventsOnParentDirectory';

      settings['typescript.tsserver.watchOptions'].watchFile = newWatchFile;

      // Write the temporary change to the file
      const updatedContent = JSON.stringify(settings, null, 2);

      await fs.writeFile(settingsPath, updatedContent);

      // Wait briefly to allow the TypeScript server to detect the change
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Restore the original file with trailing commas intact
      await fs.writeFile(settingsPath, rawContent);
      console.log('Temporarily toggled typescript.tsserver.watchOptions to trigger a tsserver reload.');
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error(`Failed to update ${settingsPath}:`, error.message);
      } else {
         console.error(`Unexpected error:`, error);
      }
      process.exit(1);
   }
}

triggerTsServerRestart();
