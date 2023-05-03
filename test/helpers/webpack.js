import path from 'path'
import replayer from 'replayer'
import webpack from 'webpack'
import WebpackMoveFilesAfterCompilePlugin from '../../src/index';

export const OUTPUT_PATH = path.resolve(__dirname, '../../.tmp');

replayer.configure({
	includeHeaderNames: false,
	includeCookieNames: false,
});

replayer.fixtureDir(path.join(__dirname, '..', 'fixtures', 'replayer'));

replayer.filter({ url: /(.*)/ });

export function createWebpackConfig() {
	return ({
		mode: 'none',
		devtool: 'source-map',
		entry: {
			index: path.resolve(__dirname, '../fixtures/index.js'),
		},
		output: {
			path: OUTPUT_PATH,
			filename: '[name].bundle.js',
		},
		plugins: [new WebpackMoveFilesAfterCompilePlugin({
			moveFrom: OUTPUT_PATH,
			moveTo: "source-maps"
		})],
	});
};

export function runWebpack(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (_err, stats) => {
			if (stats.toJson().errors.length) {
				reject({ errors: stats.toJson().errors });
			};

			if (stats.toJson().warnings.length) {
				reject({ warnings: stats.toJson().warnings });
			} else {
				resolve({ config, stats });
			};
		});
	});
};
