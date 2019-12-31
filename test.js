const crongit = require('./index.js')();

crongit.schedule("10 * * * * *", ()=>console.log('test ok!!!\nuse Ctrl+C to exit!!'));
