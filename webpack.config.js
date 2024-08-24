const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "guille";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,  // Add a rule for SCSS files
          use: [
            'style-loader',  // Injects styles into DOM
            'css-loader',    // Translates CSS into CommonJS modules
            'sass-loader',   // Compiles Sass to CSS
          ],
        },
        {
          test: /\.css$/,  // Rule for CSS files
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,  // Rule for image files
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,  // Rule for font files
          type: 'asset/resource',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
  });
};