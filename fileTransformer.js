import { basename } from 'path';

export function process(_sourceText, sourcePath, _options) {
  return {
    code: `module.exports = ${JSON.stringify(basename(sourcePath))};`,
  };
}
