# @RimuTec/node-git-info

Welcome! This nodejs library - `@RimuTec/node-git-info` - is a simple wrapper around the `git` command line tool. It provides an interface for getting information about the current git repository.

It is meant to be a replacement for the original [`node-git-info`](https://www.npmjs.com/package/node-git-info) which was last published in November 2016. Since then things have changed in particular in terms of dependencies. This has resulted in the following issues. It appears as if the original `node-git-info` is no longer maintained and now has several issues.

## Vulnerabilities

As of writing, the original `node-git-info` has 2 vulnerabilities, both with high severity:

```bash
$ npm audit
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ Regular Expression Denial of Service in moment         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ moment                                                 │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <2.19.3                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.19.3                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > node-git-info@1.1.0 > moment@2.16.0                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-446m-mv8f-q348      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ Path Traversal: 'dir/../../filename' in moment.locale  │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ moment                                                 │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <2.29.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.29.2                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > node-git-info@1.1.0 > moment@2.16.0                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-8hfj-j24r-96c4      │
└─────────────────────┴────────────────────────────────────────────────────────┘
2 vulnerabilities found
Severity: 2 high
```

These two high severity vulnerabilities are present in the `moment` package version that the original `node-git-info` depends on. The vulnerabilities are:

1. Regular Expression Denial of Service (ReDoS) in versions of `moment` before 2.19.3. More info can be found [here](https://github.com/advisories/GHSA-446m-mv8f-q348).
2. Path Traversal vulnerability in versions of `moment` before 2.29.2. More info can be found [here](https://github.com/advisories/GHSA-8hfj-j24r-96c4).

There are different ways to resolve the vulnerabilities in the original `node-git-info`. For example, you could just clone the repo and upgrade the `moment` dependency to the most recent version (2.30.1 as of writing) using the command

```bash
pnpm update moment
```

However, as of writing (Jan 2024) `moment` is considered legacy (see below), so a better option would be avoiding `moment` altogether. This is the approach taken here. As a result `@RimuTec/node-git-info` has no vulnerabilities as of writing (01 Jan 2024).

## Legacy Dependencies

`moment` is a library that is considered legacay since September 2020 according to their website (see https://momentjs.com/docs/#/-project-status/). One of their recommendations is to use `luxon`. This project uses the TypeScript variant [`ts-luxon`](https://tonysamperi.github.io/ts-luxon/docs/#/).

## Deprecated Dependencies

Furthermore, the original `node-git-info` references packages which in turn have subdependencies that have been deprecated:
- har-validator
- istanbul
- request
- uuid

`@RimuTec/node-git-info` does not use any of these packages.

## Example Output

Running `node-git-info` in a git repository will produce the following output

```bash
[@RimuTec/node-git-info] git.properties has been created successfully.
```

It will create or update the file `git.properties` in the root of the repository with content similar to the following:

```txt
git.commit.id.abbrev=42954d1
git.commit.user.email=user@email.com
git.commit.message.full=first commit
git.commit.id=42954d1fe6285fea65ba81ea39d71d5b75f9ade0
git.commit.message.short=first commit
git.commit.user.name=User Name
git.branch=master
git.commit.time=2016-11-20T11:48:42.000Z
```

## Dev Environment

This repository uses a dev container.

If you don't use a dev container, the setup may not work for you. Generally speaking all repositories provided by RimuTec use a dev container. The setup of the dev environment is the same for all of them.

There are 3 prerequisites that are comment across the three supported host OSes (operating systems), Linux, MacOS and Windows. There are some additional notes for Windows users at the end of this section. The setup has been tested on Linux and on Windows only, but is expected to work on MacOS as well.

### All Host OSes

Prerequisites:
1. VS Code with extention "Remote Development"
2. Docker Desktop
3. Git command line interface (CLI)

### Windows Only

If your host computer uses Windows, then you need to install WSL2 with a Linux distro. Generally, I use the latest LTS version of Ubuntu (22.04 as of writing).

Also, if you are on Windows, then you need to clone the repo into the Linux file system. If you don't then you are likely to encounter problems such as synchronization issues.

To check whether you've clone into a Linux files system on Windows, run the following command in the terminal (bash):

```bash
pwd
```

If the output starts with `/home`, then you are in the Linux file system, i.e. you are in the correct place. If the output starts with `/mnt` or `/c`, then you are in the Windows file system and you are likely to experience issues with notifications of file changes.

Note that MinGW-w64 for Windows will not suffice either, regardless of how good their bash implementation might be. MinGW-w64 is not a full Linux operating system. It's a runtime environment for GCC and LLVM.
