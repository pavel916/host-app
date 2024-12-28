const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Входной файл
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto', // Обязательно для Module Federation
  },
  devServer: {
    port: 3001, // Порт для хостового приложения
    static: path.join(__dirname, 'dist'),
    hot: true,
    open: true, // Автоматически открывать приложение в браузере
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Обработка JavaScript и JSX файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Поддержка React и современных возможностей JS
          },
        },
      },
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Обработка изображений
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Убедитесь, что `public/index.html` существует
    }),
    new ModuleFederationPlugin({
      name: 'hostApp', // Имя хоста
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3002/remoteEntry.js', // URL удалённого приложения
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Расширения файлов, которые можно пропускать в импортах
  },
};
