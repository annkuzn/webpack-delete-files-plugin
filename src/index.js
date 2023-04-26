const fs = require('fs');
const path = require('path');

const DEFAULT_DELETE_REGEX = /\.map$/;

module.exports = class DeleteFilesAfterCompilePlugin {
	constructor(deleteRegex) {
		this.deleteRegex = deleteRegex || DEFAULT_DELETE_REGEX;
	};

	apply(compiler) {
		compiler.hooks.done.tapPromise('DeleteFilesAfterCompilePlugin', async (stats) => {
			await this.deleteFiles(stats)
		});
	};

	// eslint-disable-next-line class-methods-use-this
	getAssetPath(compilation, name) {
		return path.join(
			compilation.getPath(compilation.compiler.outputPath),
			name.split('?')[0]
		)
	};

	async deleteFiles(stats) {
		const assetsKeys = Object.keys(stats.compilation.assets);
		const assetsKeysForDelete = assetsKeys.filter(name => this.deleteRegex.test(name));

		assetsKeysForDelete.forEach((name) => {
			const filePath = this.getAssetPath(stats.compilation, name);

			if (filePath) {
				return fs.unlinkSync(filePath);
			};

			// eslint-disable-next-line no-console
			console.warn(
				`DeleteFilesAfterCompilePlugin: unable to delete '${name}'. ` +
				'File does not exist; it may not have been created ' +
				'due to a build error.'
			)
		});
	}
}
