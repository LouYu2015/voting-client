# A Voting Website Server using React 用 React 开发的投票网站前端

## Introduction 简介

This repository contains the client part of UW CSSA's voting website.
For an introduction of the whole project, please see the main project page.

This project assumes that a REST API is already provided.
The code doesn't contain a backend implementation.
Please refer to the main project page for the corresponding backend implemented in Django.

此项目包含 UW CSSA 投票网站的客户端。
关于整体项目介绍，请参阅主文档。

该项目需要后端提供 REST API。
项目不包含后端实现。
若要获取对应的 Django 后端，请参阅主项目文档。

## Code Structure 代码结构

* `.htaccess`: rewrite rules that force HTTPS connection / 服务器设置，强制 HTTPS 连接
* `public/`: static files / 静态文件
  * `background.jpg`: background image for voting result page (used on areas with no text) / 投票结果界面背景（用于空白区域）
  * `background_blur.jpg`: background image for voting result page (used on areas with text) / 投票结果界面背景（用于文字区域）
  * `logo.jpg`: logo image that appears on voting result page / 投票结果界面上的 logo
  * `index.html`: skeleton HTML code / HTML 骨架
  * `robot.txt`: prevents search engine from indexing this website / 阻止搜索引擎爬取该网站
* `src`: front-end logics / 前端逻辑
  * `Configurations.js`: set the backend URL / 设置后端的地址
  * `index.js`: defines URL routing rules / 定义 URL 规则
  * `StatusBar/`: the banner (toast) that pop up on the page's bottom / 在页面下方弹出的提示栏
  * `VoteResultApp/`: the voting result page / 投票结果页面
  * `VoteSubmissionApp/`: the vote submission page for user / 投票页面

## Deployment 部署

Install dependencies by running command:

运行以下命令来安装依赖项：

```bash
npm install
```

You also need to change `BASE_URL` in `Configuration.js` to REST API server's URL.

你也需要修改 `Configuration.js` 中的 `BASE_URL`，使其指向后端服务器。

### Local Test 本地测试

To run the client locally:

若要在本地运行客户端：

```bash
npm start
```

You should be able to access the vote submission page in `http://localhost:3000/qr_code/<serial number>` where `<serial number>` is a user's serial number. You can also access the voting result page in `http://localhost:3000/view_result/<question id>` where `<question id>` is the question's id in the database.

你可以在 `http://localhost:3000/qr_code/<serial number>` 看到投票界面，其中 `<serial number>` 是用户的序列号。你也可以在 `http://localhost:3000/view_result/<question id>` 查看投票结果，其中 `<question id>` 是题目的数据库编号。

### Deploy on Internet 在互联网上部署

* Run command `npm run build`
* Run command `cp .htaccess build/`
* Upload the `build` folder to your server and configure it as a static website. Please refer to your service provider's documentation on how to serve a static website.


* 运行命令 `npm run build`
* 运行命令 `cp .htaccess build/`
* 把 `build` 文件夹作为静态网站上传到你的服务器。请参阅云服务商的文档。

## Credits 鸣谢

The background image is adapted from [The ROCK concert Android Homescreen by Ramy434 MyColorscreen](https://wallpapersafari.com/w/wOf85i).

The UI style and color scheme is partially adapted from Bootstrap project, which is licensed under MIT license.

背景图片来自 [The ROCK concert Android Homescreen by Ramy434 MyColorscreen](https://wallpapersafari.com/w/wOf85i)。

UI 风格和配色的灵感部分来自 Bootstrap 项目，以 MIT 协议授权。

	The MIT License (MIT)

	Copyright (c) 2011-2021 Twitter, Inc.
	Copyright (c) 2011-2021 The Bootstrap Authors

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
