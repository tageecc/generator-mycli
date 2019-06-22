import * as prettyBytes from 'pretty-bytes';
import * as prettyMs from 'pretty-ms';
import chalk from 'chalk';
import ora from 'ora';

const FILL_CHAR = chalk.cyan('█');
const BG_CHAR = '░';
const STARTING_CHAR = chalk.gray('[');
const ENDING_CHAR = chalk.gray(']');
const BAR_LENGTH = 40;

const createProgressBar = (title = '', successTitle = '') => {
    const startTime = process.hrtime();
    const spinner = ora();
    const updateProgress = text => (spinner.text = text);
    const getCompleteness = progress => Math.round(BAR_LENGTH * progress);
    const fillProgress = percent => FILL_CHAR.repeat(getCompleteness(percent));
    const fillSpace = percent => BG_CHAR.repeat(BAR_LENGTH - getCompleteness(percent));

    spinner.start();

    return {
        tick(complete, total) {
            if (!total || !complete) {
                return;
            }
            const percent = complete / total;
            const [seconds, nanoSeconds] = process.hrtime(startTime);
            const timeSinceStartInMs = seconds * 1000 + nanoSeconds / 1e6;
            const speed = (complete * 1000) / timeSinceStartInMs;
            const leftTime = prettyMs(Math.round(((total - complete) * 1000) / speed));
            const prependedHeader = chalk.grey(
                `速度: ${chalk.white(prettyBytes(speed) + '/s')}, ` + `预计剩余时间: ${chalk.white(leftTime)}`
            );

            const currentProgressFrame =
                `${title}\n` +
                `${STARTING_CHAR}${fillProgress(percent)}` +
                `${fillSpace(percent)}${ENDING_CHAR} ${prettyBytes(complete)}/${prettyBytes(total)}` +
                `${prependedHeader ? `\n${prependedHeader}\n` : ''}`;

            updateProgress(currentProgressFrame);
        },
        end() {
            if (spinner.isSpinning) {
                const [totalSec] = process.hrtime(startTime);
                spinner.succeed(chalk.green(`${successTitle} 耗时: ${prettyMs(totalSec * 1000)} `));
            }
        },
    };
};

export default createProgressBar;
