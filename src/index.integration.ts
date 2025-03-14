import mock from 'mock-fs'; // Update the import statement
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as properties from './gitProperties';
const appRootDir = 'test';//require('app-root-dir').get();
import PropertiesReader from 'properties-reader';
import { deleteFilesRecursivelyByName } from './utils';

describe('git.properties', () => {
   const gitPropertiesFileName = 'git.properties';
   const gitPropertiesExpectedDefaultFileName = appRootDir + '/' + gitPropertiesFileName;
   let tmpTestOutputFolder: string = './tmp';

   beforeAll(() => {
      if (!fs.existsSync(tmpTestOutputFolder)) {
         fs.mkdirSync(tmpTestOutputFolder);
      }
   });

   async function checkGitPropertiesFileHasExpectedData(filePath: any) {

      expect(fs.existsSync(filePath)).toBeTruthy();

      const propertiesReader = PropertiesReader(filePath);

      const data = propertiesReader.getAllProperties();

      const dataAsJson = JSON.stringify(data);
      console.log(dataAsJson);

      // read(filePath, function (error, data) {
      expect(data['git.commit.id.abbrev']).not.toBeUndefined();
      // expect(data['git.commit.user.email']).not.toBeUndefined();
      // expect(data['git.commit.message.full']).not.toBeUndefined();
      // expect(data['git.commit.id']).not.toBeUndefined();
      // expect(data['git.commit.message.short']).not.toBeUndefined();
      // expect(data['git.commit.user.name']).not.toBeUndefined();
      expect(data['git.branch']).not.toBeUndefined();
      expect(data['git.commit.time']).not.toBeUndefined();

      // done();
      // });
   }

   describe('git.properties', () => {
      // const gitPropertiesFileName = 'git.properties';
      // const gitPropertiesExpectedDefaultFileName = appRootDir + '/' + gitPropertiesFileName;
      // let tmpTestOutputFolder: string;

      // beforeAll(() => {
      //    tmp.setGracefulCleanup();
      //    tmp.dir({ unsafeCleanup: true }, function _tempDirCreated(error, path, cleanupCallback) {
      //       if (error) throw error;
      //       tmpTestOutputFolder = path;
      //       // now mock fs library
      //       const mockedGitProperties = `git.branch=master\ngit.commit.id.abbrev=1324324\ngit.commit.time=2016-11-18T13:16:39.000Z`;
      //       const mockedGitPropertiesPath = `${tmpTestOutputFolder}/${gitPropertiesFileName}`;
      //       let mockedFileSystem: { [key: string]: any } = {};
      //       mockedFileSystem[gitPropertiesExpectedDefaultFileName] = mockedGitProperties;
      //       mockedFileSystem[mockedGitPropertiesPath] = mockedGitProperties;
      //       mock(mockedFileSystem);
      //       cleanupCallback();
      //    });
      // });

      // beforeEach(() => {
      //    deleteFilesRecursivelyByName(tmpTestOutputFolder, gitPropertiesFileName); // delete test generated files
      // });

      // afterEach(() => {
      //    mock.restore();
      // });

      // afterAll(() => {
      //    deleteFilesRecursivelyByName(tmpTestOutputFolder, gitPropertiesFileName); // delete test generated files
      // });

      it('should have expected data', async () => {
         const callback = () => {
            checkGitPropertiesFileHasExpectedData('./git.properties');
         };
         await properties.write(tmpTestOutputFolder, callback);
      });
   });
});
