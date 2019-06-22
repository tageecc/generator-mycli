#!/usr/bin/env node

import chalk from 'chalk';
import * as program from 'commander';
import * as updateNotifier from 'update-notifier';
import say from '../lib/say';
import logger from '../util/logger';
import * as pkg from '../../package.json';
program
    .version(pkg.version, '--version')
    .name(pkg.name)
    .description(`a simple cli`);

program
    .command('say')
    .description('say hello in terminal')
    .option('-s, --string [string]', 'say [string] in terminal')
    .action(say);

program.on('command:*', cmd => {
    if (!program.commands.map((command: any) => command.name()).includes(cmd[0])) {
        logger.error("\nerror: unknown command '%s'\n", cmd[0]);
        program.help();
    }
});
program.parse(process.argv);

const notifier = updateNotifier({ pkg, updateCheckInterval: 1 });
if (notifier.update) {
    notifier.notify({
        message:
            'Update available ' +
            chalk.dim(notifier.update.current) +
            chalk.reset(' → ') +
            chalk.green(notifier.update.latest) +
            ' \nRun ' +
            chalk.cyan('npm i -g ' + notifier.update.name) +
            ' to update'
    });
}

if (!program.args.length) {
    program.help();
}
