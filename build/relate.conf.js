/**
 * author: jdj
 */
// 相关配置
module.exports.relate = {
    envs: process.env.NODE_ENV, //从package.json 中获取环境
    entrys: {    //入口文件
        index: './src/page/index/index.js',
        page1: './src/page/page1/index.js',
        page2: './src/page/page2/index.js',
    }
}