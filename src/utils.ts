'use strict'

import { spawn } from 'child_process';

/* test utility methods */

export function deleteFilesRecursivelyByName(appRootDir: any, fileName: any) {
   var shellSyntaxCommand = 'find ' + appRootDir + ' -name ' + fileName + ' -type f|xargs rm -f';
   spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
}

/* end test utility methods */
