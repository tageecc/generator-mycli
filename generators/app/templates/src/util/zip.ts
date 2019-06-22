import * as fs from 'fs-extra';
import * as archiver from 'archiver';
import * as fsUtils from 'nodejs-fs-utils';
import logger from './logger';

const sleep = sec => new Promise(resolve => setTimeout(resolve, sec));
export const zip = (filePath = process.cwd(), fileName, ignoreCache = true, cb?) => {
    return new Promise<any>((resolve, rejects) => {
        const savePath = `/tmp/${fileName}.zip`;

        if (!ignoreCache && fs.existsSync(savePath)) {
            logger.info('检测到缓存文件，跳过打包');
            resolve(savePath);
        }

        const totalSize = fsUtils.fsizeSync(filePath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.on('end', () => resolve(savePath));
        archive.on('error', rejects);
        if (cb) {
            archive.on('progress', progress => cb({ total: totalSize, transferred: progress.fs.processedBytes }));
        }
        archive.pipe(fs.createWriteStream(savePath));
        archive.directory(filePath, false);
        archive.finalize();
    });
};
