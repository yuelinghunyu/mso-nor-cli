/**
 * author: jdj
 */
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

// 消除冗余的css
const purifyCssWebpack = require('purifycss-webpack')
// html模板
const htmlWebpackPlugin = require('html-webpack-plugin')
// 静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin')
// 压缩js文件
const uglifyJsPlugin  = require('uglifyjs-webpack-plugin')
// 引用rules 
const rules = require('./webpack.rule.conf')
// 引用入口文件
const entrys = require('./relate.conf').relate.entrys
// 获取当前编辑环境
const envs = require("./relate.conf").relate.envs
// 自动生产html模板
const htmlArray = []
Object.keys(entrys).forEach(element => {
    htmlArray.push({
		_html: element,
		title: 'mso',
		chunks: ['vendor', 'common', element]
	})
})
// html 文件压缩
const minify = envs === "development" ? false : {
    removeComments: true, //移除HTML中的注释
    collapseWhitespace: true, //折叠空白区域 也就是压缩代码
    removeAttributeQuotes: true, //去除属性引用
}
// 获取html-webpack-plugin参数的方法
const getHtmlConfig = (name, chunks, title) => {
	return {
		template: `./src/page/${name}/index.html`,
		filename: `${name}.html`,
		// favicon: './favicon.ico',
		title: title,
		inject: true,
		hash: true, //开启hash  ?[hash]
		chunks: chunks,
		minify: minify,
	};
}
// 基础配置
module.exports = {
    entry: entrys,
    module: {
        rules: [...rules]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '#': path.resolve(__dirname, '../static')
        }
    },
    externals: { //将外部变量或者模块加载进来
		'jquery': 'window.jQuery'
    },
    optimization: { // 提取公共代码
        minimizer: [new uglifyJsPlugin()],
        splitChunks: {
            cacheGroups: {
				vendor: {   // 抽离第三方插件
					test: /node_modules/,   // 指定是node_modules下的第三方包
					chunks: 'initial',
					name: 'vendor',  // 打包后的文件名，任意命名    
					priority: 10   // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
				},
				utils: { // 抽离自己写的公共代码，common这个名字可以随意起
					chunks: 'initial',
					name: 'common',  // 任意命名
					minSize: 0,    // 只要超出0字节就生成一个新包
					minChunks: 2
				}
			}
        }
    },
    plugins: [
        new webpack.ProvidePlugin({ // 全局暴露统一入口
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // new copyWebpackPlugin([{ //静态资源输出
        //     from: path.resolve(__dirname, '../static'),
        //     to: './static',
		// 	ignore: ['.*']
        // }]),
        new purifyCssWebpack({ // 消除冗余的css代码
            paths: glob.sync(path.join(__dirname, "../src/*/*/*.html"))
        })
    ]
}
//自动生成html模板
htmlArray.forEach((element) => {
	module.exports.plugins.push(
        new htmlWebpackPlugin(
            getHtmlConfig(element._html, element.chunks, element.title)
        )
    )
})