<div align="center">
	<img src="https://i.loli.net/2021/11/24/x5lLfuSnEawBAgi.png"/>
	<h1>Soybean Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

Soybean Admin  是一个基于 Vue3、Vite、TypeScript、Naive UI 的免费中后台模版，它使用了最新的前端技术栈，内置丰富的主题配置，有着极高的代码规范，基于mock实现的动态权限路由，开箱即用的中后台前端解决方案，也可用于学习参考。

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发, 使用高效率的npm包管理器pnpm
- **TypeScript**：应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式，基于原子css - unocss的动态主题颜色
- **代码规范**：丰富的规范插件及极高的代码规范
- **权限路由**：简易的路由配置、基于mock的动态路由能快速实现后端动态路由
- **请求函数**：基于axios的完善的请求函数封装，提供Promise和hooks两种请求函数，加入请求结果数据转换的适配器

## 预览

- [soybean-admin](https://soybean.pro/)

## 文档

- [项目文档](https://docs.soybean.pro)

## 代码仓库

- [github](https://github.com/honghuangdc/soybean-admin)

- [gitee](https://gitee.com/honghuangdc/soybean-admin)

## 项目示例图

![](https://s2.loli.net/2022/01/24/ovK6Oyqr7gIMu2n.png)

![](https://s2.loli.net/2022/01/24/O8loxYhMySHwGfJ.png)

![](https://s2.loli.net/2022/01/24/HKwpJ7Ab6j8fVvk.png)

![](https://s2.loli.net/2022/01/24/bqJRSDZHBv3jsif.png)

![](https://s2.loli.net/2022/01/24/wXpHeau6UrSTWdF.png)

![](https://s2.loli.net/2022/02/16/pBwF2gaxXnKZe3D.png)

![](https://s2.loli.net/2022/02/16/pfuxVEPsTJIXw5n.png)

## 开发计划

- [x] 引入ECharts替换AntV G2Plot
- [ ] 多页签：同一页面支持多个Tab(应用场景：不同query参数的详情页面在不同tab展示)
- [ ] 缓存主题配置
- [ ] 添加锁屏组件、全局Iframe组件
- [ ] 性能优化(优化递归函数)
- [ ] 精简版(新分支thin)
- [ ] 文档完善
- [ ] 表单、表格示例
- [ ] 示例页面完善
- [ ] element-plus版本
- [ ] 其他UI版本
- [ ] soybean-admin cli工具(选择不同UI)
- [ ] soybean-admin 后台服务java版: [soybean-admin-java](https://github.com/honghuangdc/soybean-admin-java)
- [ ] soybean-admin 后台服务go版: [soybean-admin-go](https://github.com/honghuangdc/soybean-admin-go)
- [ ] soybean-admin 后台服务nodejs版: [soybean-admin-nestjs](https://github.com/honghuangdc/soybean-admin-nestjs)
- [ ] 前端可视化创建路由页面

## 安装使用

- 克隆代码

```bash
git clone https://github.com/honghuangdc/soybean-admin.git
```

- 安装依赖

```bash
pnpm i
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

::: warning 注意

**本地环境需要安装 pnpm 6.x 、Node.js 14.x 和 Git**

:::

## 如何贡献

非常欢迎您的加入！[提一个 Issue](https://github.com/honghuangdc/soybean-admin/issues/new) 或者提交一个 Pull Request。

## Git 贡献提交规范

项目已经内置angular提交规范，通过git cz 代替git commit 命令即可。

git cz命令需要全局安装 commitizen

```bash
pnpm i -g commitizen
```

## 浏览器支持

本地开发推荐使用`Chrome 90+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/)IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 开源作者

[@Soybean](https://github.com/honghuangdc)

## 交流

`Soybean Admin` 是完全开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供微信和QQ交流群，使用问题欢迎在群内提问。

- 本人微信号：honghuangdc，欢迎来技术交流，业务咨询。

- 微信交流群：
  **微信群的人数已经满200个了，无法扫码，可以添加本人的微信再邀请进入**

- QQ交流群 `711301266`

  <div style="text-align:left">
    <img src="https://i.loli.net/2021/11/24/1J6REWXiHomU2kM.jpg" style="width:200px" />
  </div>

## License

[MIT © Soybean-2021](./LICENSE)
