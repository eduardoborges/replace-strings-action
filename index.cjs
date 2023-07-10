'use strict';

var fs = require('fs');

const run = ()=>{
    const variables = {
        FIRST_NAME: 'John',
        LAST_NAME: 'Doe'
    };
    let content = fs.readFileSync('./test.txt', 'utf-8');
    Object.entries(variables).forEach(([key, value])=>{
        const regex = new RegExp(`__${key}__`, 'g');
        content = content.replace(regex, String(value));
    });
    fs.writeFileSync('./test.txt', content, 'utf-8');
};
run();
//# sourceMappingURL=index.cjs.map
