const cron = require('node-schedule');
const git = require('simple-git')();



/*
	cron.scheduleJob('1-50 * * * * *', function(){
		console.log('scheduleCronstyle:' + new Date());
	});
*/


git.pull('origin', 'master', {'--no-rebase': null}, ()=>{console.log(new Date() + ' - cron-git: git pull done.' + require('os').hostname())});


git.add('./*')
   .commit("Committed by cron-git auto")
   .push(['-u', 'origin', 'master'], () => console.log(new Date() + ' - cron-git: git push done.'));