'use strict';

var exec = require('child-process-promise').exec;
var moment = require('moment');

export async function getBranch() {
   const result = await exec('git symbolic-ref HEAD | sed -e "s/refs\\/heads\\//"/');
   return result.stdout.trim();
}

export async function getCommitId() {
   const result = await exec('git rev-parse HEAD')
   return result.stdout.trim();
}

export async function getCommitUserName() {
   const result = await exec('git log -1 --pretty=format:%an')
   return result.stdout.trim();
}

export async function getCommitUserEmail() {
   const result = await exec('git log -1 --pretty=format:%ae');
   return result.stdout.trim();
}

export async function getCommitMessageFull() {
   const result = await exec('git log -1 --pretty=format:%B')
   return result.stdout.trim();
}

export async function getCommitMessageShort() {
   const result = await exec('git log -1 --pretty=format:%s')
   return result.stdout.trim();
}

export async function getCommitTime() {
   const result = await exec('git log -1 --pretty=format:%ct')
   return moment(result.stdout.trim() * 1000).toISOString();
}
