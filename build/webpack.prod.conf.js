const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");

// 清除打包的目录等
const cleanWebpackPlugin = require("clean-webpack-plugin")
// 对js文件进行处理 压缩
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
// 对css文件进行处理
const optimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// js和css 分离
const extractTextPlugin = require('extract-text-webpack-plugin')
// 引用webpack.base.conf.js
const webpackConfigBase = require('./webpack.base.conf')