
<img alt="Icon" src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view2.jpg" align="left" hspace="1" vspace="1">

# UCraft-Music-Player : From UI to Code

> PWA-Vue极简音乐应用
<a href="https://workboxjs.org">
<br>
<img src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/Workbox-Logo-Grey.svg" alt="workbox" width="10%" ></a>
<br>
<br>
  <a href="https://github.com/vuejs/vue-cli"><img src="https://img.shields.io/badge/vue--cli-v2.9.2-green.svg" alt="vue-cli"></a>
  <a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/vue-v2.5.2-green.svg" alt="Vue"></a>
  <a href="https://github.com/vuejs/vuex"><img src="https://img.shields.io/badge/vuex-v3.0.1-green.svg" alt="vuex"></a>
  <a href="https://github.com/vuejs/vue-router"><img src="https://img.shields.io/badge/vue--router-v3.0.1-green.svg" alt="vue-router"></a>
  <a href="https://github.com/axios/axios"><img src="https://img.shields.io/badge/axios-v0.17.1-blue.svg" alt="axios"></a>
  <a href="https://github.com/ustbhuangyi/better-scroll"><img src="https://img.shields.io/badge/better--scroll-v1.7.2-blue.svg" alt="better-scroll"></a>
  <a href="https://github.com/hilongjw/vue-lazyload"><img src="https://img.shields.io/badge/vue--lazyload-v1.1.4-yellow.svg" alt="vue-lazyload"></a>


## 在线演示


[Code by XHY HT](https://github.com/ioslides) | [Design by XHY YLX HT](https://github.com/ioslides)
--- | ---
![Code by XHY HT](https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view1.jpg) | ![Design by XHY YLX](https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view1.jpg)

## 项目截图

<div>
	<img src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view1.jpg" width="25%">
	<img src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view1.jpg" width="25%">
  <img src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/view1.jpg" width="25%">
</div>

## 主要技术栈

[前端]

- `Vue`：构建用户界面 MVVM 框架
- `vue-router`：为SPA提供路由系统
- `vuex`：Vue集中状态管理
- `vue-lazyload`：图片懒加载库
- `better-scroll`：移动端滑动流畅体验
- `Sass(Scss)`：css 预编译处理器

[后端]

- `Node.js`：Express 本地数据抓取服务器
- `jsonp`,`axios`：抓取网易云数据

[其他]

- `manifest-json`：用于创建的CLI工具mainfest.json
- `workbox`：PWA内容库工具，用于生成 Service Worker、预缓存、路由以及运行时缓存
- `gitKraken`:git工具，任务面板
- `vue-cli`：Vue 脚手架工具
- `eslint`：代码风格检查工具，规范代码书写
- `vConsole`：移动端调试工具
- `Charles`：查看移动端网络请求数据
- `Webpack和Vue-loader`：构建应用程序，提供热重载
- `Web Server for Chrome` ：反向代理

## 项目结构
<img src="https://my20889938-1255793964.cos.ap-chengdu.myqcloud.com/ucraft-music/uCraft1.jpg" width="100%">

## Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/ioslides/uCraft-music-player.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build
```


## License

``` bash

MIT License

Copyright (c) 2019 XHY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
