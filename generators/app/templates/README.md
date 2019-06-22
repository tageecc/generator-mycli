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

```bash
npm publish
```

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
