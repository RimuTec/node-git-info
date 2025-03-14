import * as fs from 'fs';
import { writeProperties } from './gitProperties';

const tmpTestOutputFolder = '../tmp';

describe(`gitProperties`, () => {
   beforeAll(() => {
      // create directory /work/tmp if it does not exist yet
      if (!fs.existsSync(tmpTestOutputFolder)) {
         fs.mkdirSync(tmpTestOutputFolder);
      }
   });

   it(`should write`, async () => {
      await writeProperties(tmpTestOutputFolder);
      // read back the file
      const data = fs.readFileSync(`${tmpTestOutputFolder}/git.properties`, 'utf8');
      expect(data).toContain('git.commit.id.abbrev=');
      expect(data).toContain('git.commit.user.email=');
      expect(data).toContain('git.commit.message.full=');
      expect(data).toContain('git.commit.id=');
      expect(data).toContain('git.commit.message.short=');
      expect(data).toContain('git.commit.user.name=');
      expect(data).toContain('git.branch=');
      expect(data).toContain('git.commit.time=');
   });
});
