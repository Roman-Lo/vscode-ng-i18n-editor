import {resolve} from 'path';
import {promises} from 'fs';

export class FileUtils {

  static getCorrespondingTranslationFile(sourceFile: string, targetLocale: string): string {
    const parts = sourceFile.split('.');
    const fileExtPart = parts.splice(parts.length - 1, 1)[0];
    const fileNamePart = parts[parts.length - 1];
    parts[parts.length - 1] = fileNamePart + `(${targetLocale})`;
    parts.push(fileExtPart);
    const targetFile = parts.join('.');
    return targetFile;
  }

  static async listFiles(dir: string, options?: { exts?: string[] }): Promise<string[]> {
    const dirents = await promises.readdir(dir, {withFileTypes: true});
    const files: string[] = [];
    await Promise.all(dirents.map(async (dirent) => {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return FileUtils.listFiles(res, options);
      } else {
        if (options && options.exts) {
          let match = options.exts.reduce((d, v) => {
            return d ? res.endsWith('.' + v) : d;
          }, true);
          if (!match) {
            return;
          }
        }
        files.push(res);
      }
    }));
    return Array.prototype.concat(...files);
  }
}