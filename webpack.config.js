//@ts-check
// import { Configuration, Plugin, Compiler } from 'webpack';

'use strict';
const path = require('path');
const fs = require('fs');
const webviewIndexLocation = path.resolve(__dirname, 'src', 'editor', 'index.html');

// class WebEditorHtmlWebpackPlugin {

//   /**
//    *
//    *
//    * @param {import('webpack').Compiler} compiler
//    * @memberof WebEditorMainFileWebpackPlugin
//    */
//   apply(compiler) {
//     let mtime = 0;
//     try {
//       mtime = fs.statSync(webviewIndexLocation).mtimeMs;
//     } catch (e) {

//     }
//     compiler.hooks.thisCompilation.tap(
//       'WebEditorMainFileWebpackPlugin',
//       (compilation) => {
//         const target = path.resolve(compilation.outputOptions.path, 'index.html');
//         const logger = compilation.getLogger('WebEditorHtmlWebpackPlugin');
//         logger.info('begin this compilation');
//         compilation.hooks.finishModules.tapAsync('WebEditorMainFileWebpackPlugin.minifyHtml', (modules, callback) => {
//           fs.stat(webviewIndexLocation, (err, curS) => {
//             logger.info(`mtime: ${mtime}, cur: ${curS.mtimeMs}`);
//             if (!err) {
//               if (mtime < curS.mtimeMs) {
//                 // copy sync
//                 logger.info(`Copying '${webviewIndexLocation}' to '${target}'.`);
//                 fs.copyFileSync(webviewIndexLocation, target);
//               }
//             }
//             mtime = curS.mtimeMs;
//             callback();
//           });
//         });
//       }
//     );
//   }
// }

/**
 * @type {import('webpack').Configuration}
 */
const extensionConfig = {
  name: 'extension-config',
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/editor/main.ts'),
          path.resolve(__dirname, 'src/editor/mock-data.ts')
        ],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'raw-loader',
        options: {
          esModule: false,
        },
      }
    ]
  },
  plugins: [
    //new WebEditorHtmlWebpackPlugin()
  ]
};

/**
 * @type {import('webpack').Configuration}
 */
const webviewMainConfig = {
  name: 'webview-main-config',
  target: 'web',
  entry: {
    'main': './src/editor/main.ts',
    'mock-data': './src/editor/mock-data.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'window',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts'],
  },
  externals: {
    vscode: 'commonjs vscode',
    vue: 'commonjs2 vue',
    'ant-design-vue': 'commonjs ant-design-vue',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
    ]
  },
};

module.exports = [extensionConfig, webviewMainConfig];