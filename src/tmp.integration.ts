import * as tmp from 'tmp';

describe('tmp', () => {
   it('should create a tmp folder', () => {
      const tempFolderName = 'foobar';
      tmp.setGracefulCleanup();
      tmp.dir({ dir: tempFolderName }, function _tempDirCreated(error, path, cleanupCallback) {
         if (error) throw error;
         expect(path).toContain(tempFolderName);
         cleanupCallback();
      });
   });
});
