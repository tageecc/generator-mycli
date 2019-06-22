'use strict';
const { resolve } = require('path');
const fs = require('fs-extra');
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
    async prompting() {
        const generatorName = chalk.red('mycli');
        this.log(`欢迎使用 ${generatorName} 脚手架创建项目，有问题咨询 塔歌<tageecc@gmail.com> !`);

        const { name } = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入想要创建的项目名',
                default: this.appname,
                store: false
            }
        ]);
        const projectPath = name === this.appname ? process.cwd() : resolve(name);
        if (fs.pathExistsSync(projectPath) && fs.readdirSync(projectPath).length) {
            const { confirm } = await this.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: '目标目录不为空，是否覆盖?',
                    default: this.appname
                }
            ]);
            if (!confirm) {
                console.log(chalk.red('The wizard has been aborted'));
                return process.exit();
            }
        }

        fs.ensureDirSync(projectPath);

        const prompts = [
            {
                type: 'input',
                name: 'bin',
                message: '请输入想要创建的命令名称',
                default: name + '-cli'
            },
            {
                type: 'input',
                name: 'version',
                message: '请输入版本号',
                default: '0.0.1'
            },
            {
                type: 'input',
                name: 'description',
                message: '请输入 description'
            },
            {
                type: 'input',
                name: 'repository',
                message: '请输入 git repository'
            },
            {
                type: 'input',
                name: 'keywords',
                message: '请输入 keywords（逗号隔开）'
            },
            {
                type: 'input',
                name: 'author',
                message: '请输入 author'
            },
            {
                type: 'list',
                name: 'license',
                message: '请选择 license',
                choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
            },
            {
                type: 'confirm',
                name: 'install',
                message: '项目创建完成后是否自动安装依赖?',
                default: true
            }
        ];

        return this.prompt(prompts).then(props => {
            props.name = name;
            this.props = props;
        });
    }

    writing() {
        [
            'tslint.json',
            'tsconfig.json',
            '.prettierrc',
            'typings/index.d.ts',
            'src/lib/say.ts',
            'src/util/zip.ts',
            'src/util/logger.ts',
            'src/util/util.ts',
            'src/util/progress-bar.ts',
            'src/util/logger.ts',
            'src/util/env.ts',
            'src/index.ts'
        ].forEach(v => this.fs.copy(this.templatePath(v), this.destinationPath(v)));
        this.fs.copyTpl(this.templatePath('npmrc'), this.destinationPath('.npmrc'));
        this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
        this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.props);
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.props);
        this.fs.copyTpl(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));
        this.fs.copyTpl(
            this.templatePath('src/config/config.ts'),
            this.destinationPath('src/config/config.ts'),
            this.props
        );
        this.fs.copyTpl(this.templatePath('src/cli/index.ts'), this.destinationPath(`src/cli/${this.props.bin}.ts`));
        this.fs.copyTpl(
            this.templatePath('__test__/cmd.test.ts'),
            this.destinationPath('__test__/cmd.test.ts'),
            this.props
        );
    }

    launchedFromCmd() {
        return process.platform === 'win32' && process.env._ === undefined;
    }

    install() {
        if (this.props.install) {
            this.installDependencies({ bower: false });
            return;
        }

        const dot = this.launchedFromCmd() ? '>' : '$';
        console.log();
        console.log('   install dependencies:');
        console.log('     %s npm install', dot, this.props.name);
        console.log();
        console.log('   run the app:');
        if (this.launchedFromCmd()) {
            console.log('     > SET DEBUG=%s:* & npm run dev', this.props.name);
        } else {
            console.log('     $ DEBUG=%s:* npm run dev', this.props.name);
        }
    }
};
