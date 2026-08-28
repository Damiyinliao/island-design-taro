# npm 发布指南

本文档用于将 `island-design-taro` 的新版本发布到 npm。

## 发布前准备

1. 注册并登录 [npm](https://www.npmjs.com/)。
2. 为 npm 账号启用双重验证（2FA）。
3. 确认当前账号拥有 `island-design-taro` 的发布权限。
4. 确认需要发布的代码已经保存，并建议先提交到 Git。

## 推荐方式：使用发布脚本

在项目根目录打开 PowerShell，先查看 npm 上的当前版本：

```powershell
npm view island-design-taro version
```

每次发布都必须使用一个未发布过的新版本号。例如，npm 上当前是 `0.0.3`，下一版可以使用 `0.0.4`：

```powershell
.\scripts\publish-npm.ps1 -Version 0.0.4
```

脚本会依次执行：

1. 检查 npm registry 是否为官方源。
2. 检查 npm 登录状态。
3. 将 `package.json` 的版本更新为指定版本。
4. 执行 `pnpm run typecheck`。
5. 执行 `pnpm run build`。
6. 执行 `npm pack --dry-run`，预览将要上传的文件。
7. 等待人工确认。
8. 执行 `npm publish`。
9. 查询 npm 上的发布结果。

只有输入大写的 `PUBLISH` 才会真正发布。

如果只想更新版本并完成检查，不想正式发布：

```powershell
.\scripts\publish-npm.ps1 -Version 0.0.4 -DryRun
```

如果 Windows 阻止运行 PowerShell 脚本，可以使用：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish-npm.ps1 -Version 0.0.4
```

## 手动发布方式

如果不使用脚本，在项目根目录依次执行：

```powershell
# 确认使用 npm 官方源
npm config get registry

# 登录并检查当前账号
npm login
npm whoami

# 设置一个尚未发布的新版本号
npm pkg set version=0.0.4

# 检查并构建
pnpm run typecheck
pnpm run build

# 预览发布包内容
npm pack --dry-run

# 正式发布
npm publish

# 验证发布结果
npm view island-design-taro version
npm view island-design-taro@0.0.4
```

## 版本号怎么选择

版本号遵循 `主版本.次版本.修订版本`，例如 `1.2.3`：

- 修复问题：增加最后一位，例如 `0.0.4` → `0.0.5`。
- 向下兼容地新增组件或能力：通常增加中间一位，例如 `0.0.5` → `0.1.0`。
- 存在不兼容改动：增加第一位，例如 `1.2.3` → `2.0.0`。

项目还处于 `0.x` 阶段时，可以根据团队约定使用连续的补丁版本。

## 发布后操作

确认新版本可以安装：

```powershell
pnpm add island-design-taro@0.0.4
```

然后提交版本号及组件代码：

```powershell
git add .
git commit -m "feat: release island-design-taro 0.0.4"
git push
```

## 常见错误

### 不能重复发布同一版本

如果出现版本已存在的错误，请设置一个更高且未发布过的版本号。npm 不允许重复使用已经发布过的“包名 + 版本号”。

### `ENEEDAUTH` 或 `E401`

重新登录：

```powershell
npm login
npm whoami
```

### 发布到了错误的镜像源

检查并恢复 npm 官方源：

```powershell
npm config set registry https://registry.npmjs.org/
```

### 需要二次验证

按照命令行提示完成 npm 账号的 2FA 验证。不要把密码、访问令牌或验证码写进项目文件。

更多信息可查看 [npm publish 官方文档](https://docs.npmjs.com/cli/commands/npm-publish/)。
