import * as dotenv from 'dotenv';
import { GLOBAL_CONFIG_FILE } from '../config/config';
import * as fs from 'fs-extra';
import logger from './logger';

export const loadEnv = () => {
    dotenv.config({ path: '.env' });
    dotenv.config({ path: GLOBAL_CONFIG_FILE });
};

export const updateEnv = obj => {
    fs.ensureFileSync(GLOBAL_CONFIG_FILE);
    try {
        const data = {};
        fs.readFileSync(GLOBAL_CONFIG_FILE)
            .toString()
            .split('\n')
            .map(v => (data[v.split('=')[0]] = v.split('=')[1]));

        fs.writeFileSync(
            GLOBAL_CONFIG_FILE,
            Object.entries({ ...data, ...obj })
                .map(([k, v]) => k + '=' + v)
                .join('\n')
        );
    } catch (e) {
        logger.fatal('更新env错误，%o', e);
    }
};
