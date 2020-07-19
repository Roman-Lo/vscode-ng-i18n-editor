import * as path from 'path';
import * as vscode from 'vscode';
import { promises } from 'fs';

export class FileUtils {

  static getCorrespondingTranslationFile(sourceFile: string, targetLocale: string, pattern: string): string {
    const srcUri = vscode.Uri.parse(sourceFile);
    const srcParts = srcUri.fsPath.split(path.sep);
    const srcFileNameParts = srcParts[srcParts.length - 1].split('.');
    const srcFileExt = srcFileNameParts.splice(srcFileNameParts.length - 1, 1);
    const srcFileName = srcFileNameParts.join('.');

    const lParts = targetLocale.split('-');
    const lang = lParts[0];
    const region = lParts[1];

    let tarFileName = pattern
      .replace('${name}', srcFileName)
      .replace('${lang}', lang);

    if (region) {
      tarFileName = tarFileName.replace('${region}', region);
    }
    const targetFile = sourceFile.replace(srcParts[srcParts.length - 1], `${tarFileName}.${srcFileExt}`);
    return targetFile;
  }

  static async listFiles(dir: string, options?: { exts?: string[] }): Promise<string[]> {
    const dirents = await promises.readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    await Promise.all(dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
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