'use strict';

var core = require('@actions/core');
var fs = require('fs');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);

const run = ()=>{
    const filePath = core__namespace.getInput('file');
    var _process_env;
    // Captura todas as variáveis de ambiente
    const envVariables = (_process_env = process.env) !== null && _process_env !== void 0 ? _process_env : {};
    core__namespace.debug(`File path: ${filePath}`);
    core__namespace.debug(envVariables);
    // Itera sobre as variáveis de ambiente e as imprime
    if (Object.keys(envVariables).length > 0) {
        console.log('Environment variables:');
        Object.entries(envVariables).forEach(([key, value])=>{
            core__namespace.setOutput(key, value);
        });
    }
    // Lê o conteúdo do arquivo
    let content = fs.readFileSync(filePath, 'utf8');
    Object.entries(envVariables).forEach(([key, value])=>{
        const regex = new RegExp(`__${key}__`, 'g');
        content = content.replace(regex, String(value));
    });
    fs.writeFileSync('./foo.txt', content, 'utf-8');
    core__namespace.debug(content);
};
run();
//# sourceMappingURL=index.cjs.map
