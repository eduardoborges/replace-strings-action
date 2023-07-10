import * as core from '@actions/core';
import fs from 'fs';

const run = () => {
  const filePath = core.getInput('file');
  // Captura todas as variáveis de ambiente
  const envVariables = process.env;

  // Itera sobre as variáveis de ambiente e as imprime
  for (const variable in envVariables) {
    core.info(`${variable}=${envVariables[variable]}`);
  }

  // Lê o conteúdo do arquivo
  let content = fs.readFileSync(filePath, 'utf8');

  Object.entries(envVariables).forEach(([key, value]) => {
    const regex = new RegExp(`__${key}__`, 'g');
    content = content.replace(regex, String(value));
  });

  try {
    fs.writeFileSync('./foo.txt', content, 'utf-8');
  } catch (error) {
    console.log(error);
  }
  console.log(content);
  console.log('Done!');
};

run();
