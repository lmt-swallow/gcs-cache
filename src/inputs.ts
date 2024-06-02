import * as core from '@actions/core';

export interface Inputs {
  bucket: string;
  path: string;
  key: string;
  restoreKeys: string[];
  keyFileName?: string;
  compressionMethod?: string;
}

export function getInputs(): Inputs {
  const inputs = {
    bucket: core.getInput('bucket', { required: true }),
    path: core.getInput('path', { required: true }),
    key: core.getInput('key', { required: true }),
    keyFileName: core.getInput('key-file-name'),
    compressionMethod: core.getInput('compression-method'),
    restoreKeys: core
      .getMultilineInput('restore-keys')    
      .map(s => s.replace(/^!\s+/, "!").trim())
      .filter(x => x !== ""),
  };

  core.debug(`Loaded inputs: ${JSON.stringify(inputs)}.`);
  console.log(`Restore keys: ${JSON.stringify(inputs.restoreKeys)}.`)

  
  return inputs;
}
