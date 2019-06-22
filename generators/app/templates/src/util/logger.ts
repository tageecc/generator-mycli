import chalk from 'chalk';
import ora from 'ora';
import { format } from 'util';
import * as Debug from 'debug';
import * as pkg from '../../package.json';

/**
 * constant
 */
const PREFIX = pkg.name;
const SEP = chalk.gray('·');

class Logger {
    private spinner = ora();
    public formatter = msg => {
        return PREFIX + SEP + format.apply(format, msg);
    };
    public loading(...msg) {
        if (Debug.enabled('fun')) {
            this.spinner.info(chalk.yellow(this.formatter(msg)));
        } else {
            this.spinner.start(chalk.yellow(this.formatter(msg)));
        }
    }
    public success = (...str) => {
        this.spinner.succeed(chalk.green(this.formatter(str)));
    };
    public info = (...str) => {
        this.spinner.info(chalk.blue(this.formatter(str)));
    };
    public warn = (...str) => {
        this.spinner.info(chalk.yellow(this.formatter(str)));
    };
    public fatal = (...msg) => {
        this.spinner.stopAndPersist();
        this.spinner.fail(chalk.red(this.formatter(msg)));
        process.exit(1);
    };
    public error = (...msg) => {
        this.spinner.stopAndPersist();
        this.spinner.fail(chalk.red(this.formatter(msg)));
    };
    public text = (...msg: any) => {
        this.spinner.text = format.apply(format, msg);
    };
}

export default new Logger();
