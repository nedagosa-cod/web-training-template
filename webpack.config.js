const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimiZerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
	entry: './src/index.jsx',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'Web_Training'),
		filename: 'noTocar/bundle.js',
		publicPath: './', //ALERTA configuracion de produccion (/)
		assetModuleFilename: 'noTocar/assets/[name][ext]', //*
		sourceMapFilename: '[file].map', // crea archvo map que mapea el cod de produccion a development
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
				type: 'asset/resource', // *
			},
			{
				test: /\.(webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: path.join(__dirname, '/public/index.html'),
			filename: 'Web Training.html', //solo en produccion
		}),
		new MiniCssExtractPlugin({
			// extrae el css del javascript para empaquetarlo como archivo aparte
			filename: 'noTocar/styles.css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.join(__dirname, '/src/assets/images/'), //deja por separado las imagenes de las bases de datos
					to: 'noTocar/imagenes',
					noErrorOnMissing: true,
				},
				{
					//cargan los iconos del corrector
					from: path.join(__dirname, '/src/components/Corrector/assets'),
					to: 'noTocar/noTocar/assets',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/src/assets/images/NOTICIAS'),
					to: 'BASES_XxxXxx/NOTICIAS',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/public/ddbb/'), // Ruta de la carpeta de bases de datos
					to: 'BASES_XxxXxx', // Ruta donde se copiará la carpeta ddbb
					noErrorOnMissing: true,
					globOptions: {
						ignore: [
							// Ignorar archivos temporales de Excel
							'**/~$*.xlsx',
							// Ignorar archivos específicos
							'**/Aplicativos_Web.xlsx',
							// Ignorar todos los archivos .tmp
							'**/*.tmp',
						],
					},
				},
				{
					from: path.join(__dirname, '/src/assets/images/applinks'),
					to: 'BASES_XxxXxx/Aplicativos_Web/imagenes',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/public/ddbb/Aplicativos_Web.xlsx'), // Ruta de la carpeta de bases de datos
					to: 'BASES_XxxXxx/Aplicativos_Web', // Ruta donde se copiará la carpeta ddbb
					noErrorOnMissing: true,
				},
			],
		}),
	],
	optimization: {
		// optimiza el codigo
		minimize: true,
		minimizer: [new CssMinimiZerPlugin(), new TerserPlugin()],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			// evitar estar poniendo rutas relativas en los import
			'@/src': path.join(__dirname, '/src/'),
			'@/assets': path.join(__dirname, '/src/assets/'),
			'@/components': path.join(__dirname, '/src/components/'),
			'@components': path.join(__dirname, '/src/components/'),
			'@/context': path.join(__dirname, '/src/context/'),
			'@/data': path.join(__dirname, '/src/data/'),
			'@/hooks': path.join(__dirname, '/src/hooks/'),
			'@/icons': path.join(__dirname, '/src/icons/'),
			'@icons': path.join(__dirname, '/src/icons/'),
			'@/lib': path.join(__dirname, '/src/lib/'),
			'@images': path.join(__dirname, '/src/assets/images/'),
			'@styles': path.join(__dirname, '/src/styles/'),
		},
	},
	devServer: {
		port: 0,
		open: true,
		allowedHosts: 'all',
		// historyApiFallBack: true
	},
	performance: {
		//
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
}
