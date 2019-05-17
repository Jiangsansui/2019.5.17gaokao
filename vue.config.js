module.exports = {
    // 修改webpack的配置
    devServer: {
        proxy: 'http://10.10.10.215:3000'
    },
    configureWebpack: {
        // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
        externals: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'axios':'axios',
            'Quill':'Quill',
            'CodeMirror':'CodeMirror',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
        }
    }
}
