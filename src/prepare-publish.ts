import * as fs from 'fs-extra';
import * as path from 'path';

// Define source and publish directories
const srcDir = path.resolve(__dirname);
const publishDir = path.resolve(__dirname, 'publish');

// Clean up and recreate the publish directory
fs.removeSync(publishDir);
fs.ensureDirSync(publishDir);

// Files and directories to include in the publish directory
const includeFiles: string[] = [
   '.npmignore',
   'build',
   'node_modules',
];

// Path to the original package.json
const originalPackageJsonPath = path.join(srcDir, 'package.json');
// Path to the package.json copy in the publish directory
const publishPackageJsonPath = path.join(publishDir, 'package.json');

// Copy required files and directories
includeFiles.forEach((file) => {
   const srcPath = path.join(srcDir, file);
   const destPath = path.join(publishDir, file);

   if (fs.existsSync(srcPath)) {
      fs.copySync(srcPath, destPath);
      console.log(`Copied: ${file}`);
   } else {
      console.warn(`Warning: ${file} not found, skipping.`);
   }
});

// Copy the original package.json to the publish directory
fs.copySync(originalPackageJsonPath, publishPackageJsonPath);
console.log(`Copied package.json to ${publishDir}`);

// Modify the package.json in the publish directory
try {
   const packageJson = fs.readJsonSync(publishPackageJsonPath);

   // Remove devDependencies and scripts
   delete packageJson.devDependencies;
   delete packageJson.scripts;

   // Write the modified package.json back to the publish directory
   fs.writeJsonSync(publishPackageJsonPath, packageJson, { spaces: 2 });
   console.log(`Modified package.json in ${publishDir}`);
} catch (err) {
   console.error('Error processing package.json:', err);
   process.exit(1);
}

console.log(`Publish directory prepared at: ${publishDir}`);
