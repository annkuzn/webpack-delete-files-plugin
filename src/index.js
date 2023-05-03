const fs = require('fs');
const path = require('path');

const DEFAULT_REGEX_FOR_MOVE = /\.map$/;

module.exports = class WebpackMoveFilesAfterCompilePlugin {
	constructor(options = {}) {
		this.regexForMove = options.regexForMove || DEFAULT_REGEX_FOR_MOVE;
		this.moveFrom = options.moveFrom;
		this.moveTo = options.moveTo;
	};

	apply(compiler) {
		compiler.hooks.done.tapPromise('WebpackMoveFilesAfterCompilePlugin', async (stats) => {
			await this.moveFiles(stats);
		});
	};

	getAssetPath(compilation, name) {
		return path.join(                 
			 
			     
			compilation.getPath(compilation.compiler.outputPath),
			name.split('?')[0]
		)
	};

	throwError(err) {
		if (err) {
			throw err;
		};
	};

	async moveFiles(stats) {
		if(!this.moveFrom) {
			throw Error("An argument for 'moveFrom' was not provided.");
		};

		if(!this.moveTo) {
			throw Error("An argument for 'moveTo' was not provided.");
		};

		const assetsKeys = Object.keys(stats.compilation.assets);
		const assetsKeysForMove = assetsKeys.filter(name => this.regexForMove.test(name));
		
		const outputPath = stats.compilation.compiler.outputPath;
		const newDir = outputPath.replace(this.moveFrom, this.moveTo);
		const isDirNotExist = !fs.existsSync(newDir);

		isDirNotExist && fs.mkdirSync(newDir);

		for (const file of fs.readdirSync(newDir)) {
			fs.unlinkSync(path.join(newDir, file));
		};

		assetsKeysForMove.forEach((name) => {
			const filePath = this.getAssetPath(stats.compilation, name);
			
			if (filePath) {
				const newPath = filePath.replace(this.moveFrom, this.moveTo);

				return fs.rename(filePath, newPath, this.throwError);
			};

			// eslint-disable-next-line no-console
			console.warn(
				`WebpackMoveFilesAfterCompilePlugin: unable to move '${name}'. ` +
				'File does not exist; it may not have been created ' +
				'due to a build error.'
			)
		});
	}
}
