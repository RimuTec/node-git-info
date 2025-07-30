'use strict';

import { promises as fs } from 'fs';
// var fs = require('fs');
import * as gitCommand from './gitCommands';

/**
 * @param destinationPath   Directory to save git.properties file to (directory must already exist).
 * @param callback  Function to call when git.properties file has been written or when an error doing so occurs.
 */
export async function write(destinationPath: any, callback: any) {

   destinationPath = destinationPath || process.cwd(); // default location for saving the git.properties file
   // will be the current working directory of the Node.js process.

   var git = {
      branch: await gitCommand.getBranch(),
      commitId: await gitCommand.getCommitId(),
      commitUserName: await gitCommand.getCommitUserName(),
      commitUserEmail: await gitCommand.getCommitUserEmail(),
      commitMessageFull: await gitCommand.getCommitMessageFull(),
      commitMessageShort: await gitCommand.getCommitMessageShort(),
      commitTime: await gitCommand.getCommitTime()
   };

   var gitProperties: { [key: string]: string } = {
      'git.commit.id.abbrev': git.commitId.substring(0, 7),
      'git.commit.user.email': git.commitUserEmail,
      'git.commit.message.full': git.commitMessageFull.replace(/(?:\r\n|\r|\n)/g, '\\n'),
      'git.commit.id': git.commitId,
      'git.commit.message.short': git.commitMessageShort,
      'git.commit.user.name': git.commitUserName,
      'git.branch': git.branch,
      // Ensure commit time is a string for properties file
      'git.commit.time': String(git.commitTime)
   };

   var returnInfo = Object.keys(gitProperties).map(function (key: string) {
      return key + '=' + gitProperties[key] + '\n';
   })

   var gitPropertiesFormatted = returnInfo.join(''); // format git properties for marshalling to file

   var destinationPathCleaned = destinationPath.replace(/\/?$/, '/'); // make sure destination path ends
   // with '/'

   var writeSuccess; // placeholder for storing save operation success status

   // Generate git.properties file
   await fs.writeFile(destinationPathCleaned + 'git.properties', gitPropertiesFormatted);//, function (err: any) {

   // fs.writeFile(destinationPathCleaned + 'git.properties', gitPropertiesFormatted, function (err: any) {
   //    if (err) {
   //       // error has occurred saving git.properties
   //       console.log('[node-git-info][ERROR]: can\'t create git.properties file.');
   //       writeSuccess = false;
   //    }
   //    else {
   //       // saving git.properties was a success
   //       console.log('[node-git-info] git.properties has successfully created.');
   //       writeSuccess = true;
   //    }
   //    if (callback) {
   //       callback(writeSuccess);
   //    }
   // });
}

export async function writeProperties(destinationPath: string) {
   await write(destinationPath, null);
}
