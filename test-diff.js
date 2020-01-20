const crongit = require('./index.js')();

//crongit.pull({}, ()=>{console.log('good')}, ()=>{console.log('bed')});
//crongit.schedule("*/10 * * * * *", ()=>console.log('test ok!!!\nuse Ctrl+C to exit!!'), ()=>console.log('pull err err err err!!!!'));
crongit.diff(function(d,err){console.log(err)});
