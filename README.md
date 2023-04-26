# Plugin for delete files after webpack compile

The current is compatible with webpack 4 and 5 and requires at least NodeJS 6.

### Installation

Using npm:

```
$ npm install webpack-delete-files-plugin --save-dev
```

Using yarn:

```
$ yarn add webpack-delete-files-plugin --dev
```

### Usage

1. Require `webpack-delete-files-plugin`:

```js
var DeleteFilesPlugin = require('webpack-delete-files-plugin');
```

2. Add to webpack config:

```js
var config = {
 plugins: [
   new DeleteFilesPlugin()
 ]
}
```

#### Parameters

- `deleteRegex` - regex to determine, which files to delete. Default: `/\.map$/`;

```js
var config = {
  plugins: [
    new DeleteFilesPlugin(/\.js$/)
  ]
}
```

#### Commands to be aware of

- `npm test`: Runs the test suite
- `npm start lint`: Runs linting
