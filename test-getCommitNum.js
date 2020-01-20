const crongit = require('./index.js')();

//crongit.pull({}, ()=>{console.log('good')}, ()=>{console.log('bed')});
//crongit.schedule("*/10 * * * * *", ()=>console.log('test ok!!!\nuse Ctrl+C to exit!!'), ()=>console.log('pull err err err err!!!!'));
crongit.getCommitNum(function(d,err, s){console.log(err.total);console.log((new Date(err.all[0].date)).getDate())});
crongit.getTodayCommits(function(s){console.log(s)});
