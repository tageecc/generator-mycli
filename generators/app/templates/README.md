# <%= name %>

<%= description %>

## 使用

```bash
npm i -g <%= name %>
<%= bin %> say -s hello
```

## 开发

通过脚手架创建完项目后，

1. 在`cli/<%= bin %>.ts`里创建命令 commander 命令
2. 在`lib`目录创建同名 ts 文件，并开发业务逻辑

## 调试

1. 打开 terminal 窗口，执行`npm run dev`
2. 打开 terminal 窗口，执行`npm link`
3. 打开 terminal 窗口，执行`<%= bin %> -h`，查看运行结果

## 发布

1. 去`https://www.npmjs.com/`注册账号，并使用在本地shell`npm login`登陆npm账号
```bash
npm login
```

2. 发包

最简单的方式是使用`npm publish`进行发布。但是规范起见，每次发布需要先发布beat包，等线上确认测试通过后，再切换到正式包，
详情见：https://yuque.antfin-inc.com/docs/share/11f81df9-cf42-428b-bd00-05fb33f76505

3. 关于ignore

- .npmignore

默认的，如果项目根目录中没有`.npmignore`，则每次发包的时候会自动剔除掉`.gitignore`指定的目录
如果你在项目中增加了`.npmignore`，那么其会完全替代掉`.gitignore`的作用，只会剔除掉`.npmignore`指定的目录

- files字段

通过`package.json`中的`files`字段，可以设置发布文件的白名单，当`files`的指定的目录和`ignore`指定的目录冲突时，优先选择`files`的目录。
例如，在`files`和`ignore`同时声明了`readme`文件，`readme`文件依然会被发布到`npmjs`

- 优先级

files>.npmignore>.gitignore

## util 使用

#### logger

```js
import logger from './logger';
logger.success('成功，%s', '成功信息');
logger.info('信息');
logger.loading('加载中');
logger.error('错误');
logger.fatal('错误，退出进程，%o', e);
```

#### progress

```js
import createProgressBar from './progress-bar';
const bar = createProgressBar('正在打包', '🎉打包完成'); // 创建进度条
const filePath = await zipCode(
  program.dir, // 打包路径
  `fileName`, // 文件名
  true, // 覆盖缓存
  progress => bar.tick(progress.transferred, progress.total)
);
bar.end(); // 调用end结束进度条
```

#### env

```js
import { loadEnv, updateEnv } from './env';
loadEnv(); // 加载持久化数据
updateEnv({ HELLO: 123 }); // 更新持久化数据
```

#### zip

```js
import zip from './zip';
const filePath = await zipCode(
  program.dir, // 打包路径
  `fileName`, // 文件名
  true, // 覆盖缓存
  progress => bar.tick(progress.transferred, progress.total)
);
```

## 开源许可

The MIT License
