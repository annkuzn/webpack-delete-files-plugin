import fs from 'fs'
import path from 'path'

import { createWebpackConfig, runWebpack, OUTPUT_PATH } from './helpers/webpack'

function ensureOutputPath() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH)
  }
}

beforeEach(ensureOutputPath)

describe('move files after compile tests', () => {
  it('should move source maps after compilation', () => {
    return runWebpack(
      createWebpackConfig()
    )
      .then(() => {
        expect(
          fs.existsSync(path.join(OUTPUT_PATH, 'index.bundle.js.map'))
          ).toEqual(false)
        })
    });
});
  