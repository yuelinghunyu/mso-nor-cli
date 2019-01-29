/**
 * author: jdj
 */
const glob = require('glob')
// 相关配置
const getEntry =() => {
    var entry = {}
    //读取src目录所有page入口
    glob.sync('./src/page/**/*.js')
        .forEach((name) => {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3
            var eArr = []
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口 
            n = n.split('/')[1]
            eArr.push(name)
            entry[n] = eArr
        });
    return entry
};

module.exports.relate = {
    envs: process.env.NODE_ENV, //从package.json 中获取环境
    entrys: getEntry(), //入口文件
    rootPath: {
        test: './',
        pro: './pro/'
    }
}