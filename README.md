# Plugin for move files after webpack compile
### Installation

Using npm:

```
$ npm install webpack-move-files-after-compile-plugin --save-dev
```

Using yarn:

```
$ yarn add webpack-move-files-after-compile-plugin --dev
```

### Usage

1. Require `webpack-move-files-after-compile-plugin`:

```js
const WebpackMoveFilesAfterCompilePlugin = require('webpack-move-files-after-compile-plugin');
```

2. Add to webpack config:

Required params:
  path relative to the root directory;

- `moveFrom` - the path to the directory from which you want to move files;

- `moveTo` - the path to the directory where you want to move the files;
             This directory should not be used to store other files. 
             It is cleared at each compilation before new files are written.
             If the destination directory does not exist, it will be created automatically.

```js
const config = {
 plugins: [
   new WebpackMoveFilesAfterCompilePlugin({
     moveFrom: 'dist/path',
     moveTo: 'source-maps'
   })
 ]
}
```

#### Parameters

- `regexForMove` - regex to determine, which files to move. Default: `/\.map$/`;

```js
const config = {
  plugins: [
    new WebpackMoveFilesAfterCompilePlugin({
      moveFrom: 'dist/path',
      moveTo: 'source-maps',
      regexForMove: /\.js$/
    })
  ]
}
```

#### Commands to be aware of

- `npm test`: Runs the test suite
- `npm start lint`: Runs linting
