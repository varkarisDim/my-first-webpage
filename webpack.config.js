const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Hello World',
			template: 'src/index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: path.resolve(__dirname, './node_modules/'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/i,
				exclude: path.resolve(__dirname, './node_modules/'),
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
				exclude: path.resolve(__dirname, './node_modules/'),
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				exclude: path.resolve(__dirname, './node_modules/'),
				type: 'asset/resource',
			},
		],
	},
	devServer: {
		host: '0.0.0.0',//your ip address
		port: 8080,
		disableHostCheck: true,
	},
};