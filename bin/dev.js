const webpack = require('webpack');
const [ webpackClientConfig, webpackServerConfig ] = require('../webpack.config');
const nodemon = require('nodemon')
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');


console.log(webpackClientConfig);

const hmtServer = express();

const clientCompiler = webpack(webpackClientConfig);
hmtServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
        ignore: '/dist/',
    },
    writeToDisk: true,
    stats: 'errors-only'
}));

hmtServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr'
}));

hmtServer.listen(3001, () => {
    console.log('hmr');
})

const compiler = webpack(webpackServerConfig);

compiler.run((err) => {
    if (err)
        console.log(err);

    compiler.watch({}, (err) => {
        if (err)
            console.log(err);
        console.log('Ok!');
    })
});

nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
        path.resolve(__dirname, '../dist/server'),
        path.resolve(__dirname, '../dist/client')
    ]
});