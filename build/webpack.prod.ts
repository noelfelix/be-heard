const HtmlWebPackPlugin = require("html-webpack-plugin");
const JspWebpackPlugin = require("./jsp-webpack-plugin");
const { rules, getPlugins } = require("./webpack.base");
const path = require("path");
const exec = require("await-exec");

module.exports = (env: any) => {
  exec(`mkdir -p ${path.resolve(__dirname, "../dist/")}`);

  let publicPath = "/";
  if (env?.STATIC_URL) {
    publicPath = env?.STATIC_URL + "/";
  }

  const htmlPlugin = new HtmlWebPackPlugin({
    title: "Caching",
    template: "./src/index.html",
    path: path.resolve(__dirname, "../dist"),
    minify: false,
    publicPath: publicPath + "app",
  });

  return {
    mode: "production",
    entry: "./src/index.tsx",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"],
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      publicPath: publicPath + "app",
      filename: "static/[name].[contenthash].js",
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
    plugins: [htmlPlugin, ...getPlugins(env, publicPath + "app")],
  };
};
