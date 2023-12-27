import { getBranch, getCommitId, getCommitMessageFull, getCommitMessageShort, getCommitTime, getCommitUserEmail, getCommitUserName } from './gitCommands';

describe(`gitCommands`, () => {
   it(`should getBranch`, async () => {
      const branch = await getBranch();
      expect(branch).not.toBeUndefined();
   });

   it(`should getCommitId`, async () => {
      const commitId = await getCommitId();
      expect(commitId).not.toBeUndefined();
   });

   it(`should getCommitUserName`, async () => {
      const commitUserName = await getCommitUserName();
      expect(commitUserName).not.toBeUndefined();
   });

   it(`should getCommitUserEmail`, async () => {
      const commitUserEmail = await getCommitUserEmail();
      expect(commitUserEmail).not.toBeUndefined();
   });

   it(`should getCommitMessageFull`, async () => {
      const commitMessageFull = await getCommitMessageFull();
      expect(commitMessageFull).not.toBeUndefined();
   });

   it(`should getCommitMessageShort`, async () => {
      const commitMessageShort = await getCommitMessageShort();
      expect(commitMessageShort).not.toBeUndefined();
   });

   it(`should getCommitTime`, async () => {
      const commitTime = await getCommitTime();
      expect(commitTime).not.toBeUndefined();
   });
});
