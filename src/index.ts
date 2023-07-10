import * as core from '@actions/core';
import fs from 'fs';

const run = () => {
  const filePath = core.getInput('file');
  // Captura todas as variáveis de ambiente
  const envVariables = process.env ?? {};

  core.debug(`File path: ${filePath}`);
  core.debug(envVariables!);

  // Itera sobre as variáveis de ambiente e as imprime
  if (Object.keys(envVariables).length > 0) {
    console.log('Environment variables:');
    Object.entries(envVariables).forEach(([key, value]) => {
      core.setOutput(key, value);
    });
  }
  // Lê o conteúdo do arquivo
  let content = fs.readFileSync(filePath, 'utf8');

  Object.entries(envVariables).forEach(([key, value]) => {
    const regex = new RegExp(`__${key}__`, 'g');
    content = content.replace(regex, String(value));
  });

  fs.writeFileSync('./foo.txt', content, 'utf-8');
  core.debug(content);
};

run();
