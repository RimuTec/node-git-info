#!/usr/bin/env node
'use strict';
import * as gitProperties from './gitProperties';
import commandLineArgs from 'command-line-args';

// library's entry point
var execute = function () {

   // define allows command line arguments when calling library
   const optionDefinitions = [
      { name: 'directory', alias: 'd', type: String }
   ]

   // convert command line arguments to object
   const options = commandLineArgs(optionDefinitions);

   // define callback function to call when git.properties file has been written or when an error doing so occurs.
   var callback = function (writeSuccess: any) {
      if (writeSuccess) {
         //exit with a 'success' code
         process.exit(0);
      } else {
         //exit with a 'failure' code
         process.exit(1);
      }
   }

   // write git.properties file
   gitProperties.write(options.directory, callback);

   console.log('[@RimuTec/node-git-info] git.properties has been created successfully.');
}

execute();

module.exports = execute;
