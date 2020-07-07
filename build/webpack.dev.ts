import HtmlWebPackPlugin from "html-webpack-plugin";
const { rules, getPlugins } = require("./webpack.base");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const path = require("path");
const exec = require("await-exec");

const stylelintPlugin = new StyleLintPlugin({
  configFile: path.resolve(__dirname, "../stylelint.config.js"),
  context: path.resolve(__dirname, "../src/"),
  files: "**/*.scss",
  emitErrors: false,
});

module.exports = (env: any) => {
  exec(`mkdir -p ${path.resolve(__dirname, "../dist/")}`);

  let publicPath = "/";

  exec(`mkdir -p ${path.resolve(__dirname, "../dist/")}`);

  const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    path: path.resolve(__dirname, "../dist"),
    publicPath: publicPath + "app",
  });

  return {
    mode: "development",
    entry: "./src/index.tsx",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      publicPath: publicPath + (env?.LOCAL_DEV ? "" : "app"),
      filename: "static/bundle.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.(ts|tsx)$/,
          loader: "awesome-typescript-loader",
          exclude: /node_modules/,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
          exclude: /node_modules/,
        },
        ...rules,
      ],
    },
    plugins: [
      htmlPlugin,
      stylelintPlugin,
      ...getPlugins(env, publicPath + "app"),
    ],
    devServer: {
      openPage: "app",
      historyApiFallback: {
        rewrites: [{ from: /./, to: "/index.html" }],
      },
      inline: true,
      port: 8081,
      proxy: {
        "/acton/": {
          target: `http://localhost`,
        },
        "/app/": {
          target: `http://localhost:8081`,
          pathRewrite: {
            "/app": "",
          },
        },
      },
    },
  };
};
