const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
	entry: './src/index.jsx',
	devtool: 'eval-source-map',
	output: {
		path: path.join(__dirname, 'Web Training'),
		filename: 'noTocar/bundle.js',
		publicPath: '/', //ALERTA configuracion de development (/)
		assetModuleFilename: '[name][ext]',
		sourceMapFilename: '[file].map', // crea archvo map que mapea el cod de produccion a development
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
				type: 'asset/resource',
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
			//filename: 'Web Training.html' //solo en produccion
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
					from: path.join(__dirname, '/src/assets/images/NOTICIAS'),
					to: 'BASES_ClaroSwat/NOTICIAS',
					noErrorOnMissing: true,
				},
				{
					// carpeta para iconos de corrector
					from: path.join(__dirname, '/src/components/Corrector/assets'),
					to: 'noTocar/noTocar/assets',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/public/ddbb/'), // Ruta de la carpeta de bases de datos
					to: 'BASES_ClaroSwat', // Ruta donde se copiará la carpeta ddbb
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
					to: 'BASES_ClaroSwat/Aplicativos_Web/imagenes',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/public/ddbb/Aplicativos_Web.xlsx'), // Ruta de la carpeta de bases de datos
					to: 'BASES_ClaroSwat/Aplicativos_Web', // Ruta donde se copiará la carpeta ddbb
					noErrorOnMissing: true,
				},
			],
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			// evitar estar poniendo rutas relativas en los import
			'@images': path.join(__dirname, '/src/assets/images/'),
			'@components': path.join(__dirname, '/src/components/'),
			'@styles': path.join(__dirname, '/src/styles/'),
			'@icons': path.join(__dirname, '/src/icons/'),
			'@/lib': path.join(__dirname, '/src/lib/'),
			'@/components': path.join(__dirname, '/src/components/'),
			'@/icons': path.join(__dirname, '/src/icons/'),
			'@/context': path.join(__dirname, '/src/context/'),
			'@/data': path.join(__dirname, '/src/data/'),
			'@/assets': path.join(__dirname, '/src/assets/'),
			'@/hooks': path.join(__dirname, '/src/hooks/'),
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
		// maxEntrypointSize: 512000,
		// maxAssetSize: 512000,
	},
}
