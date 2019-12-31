/*
 * @Author: IoTcat (https://iotcat.me) 
 * @Date: 2019-12-31 11:59:49 
 * @Last Modified by: IoTcat
 * @Last Modified time: 2019-12-31 18:28:21
 */
module.exports = function(o_params){

	/* factory mode */
	var o = {
		dir: __dirname,
		debug: false,
		allowNotice: true,
		pull: (params, callback) => pull(params, callback),
		push: (params, callback) => push(params, callback),
		sync: (callback, params_pull, params_push) => sync(callback, params_pull, params_push),
		schedule: (time, callback, params_pull, params_push) => schedule(time, callback, params_pull, params_push)
	}


	/* merge params */
	Object.assign(o, o_params);


	/* modules import */
	const cron = require('node-schedule');
	const git = require('simple-git')(o.dir);

	/* Git pull action */
	var pull = function(params_user, callback){
		var params = {
			remote: {
				repo: 'origin',
				branch: 'master'
			},
			pull_params: {}
		}
		Object.assign(params, params_user);

		git.pull(params.remote.repo, 
			params.remote.branch, 
			params.pull_params, 
			function(){
				if(o.allowNotice){
					console.log(new Date() + ' - cron-git: git pull done.');
				}
   				if(callback !== undefined){
   					callback();
   				}
			});
	}

	/* Git push action */
	var push = function(params_user, callback){
		var params = {
			add: {
				path: './*'
			},
			commit: {
				message: "Committed by cron-git from "+ require('os').hostname()
			},
			push_params: ['-u', 'origin', 'master']
		}
		Object.assign(params, params_user);

		git.add(params.add.path)
   			.commit(params.commit.message)
   			.push(params.push_params, function(){
				if(o.allowNotice){
					console.log(new Date() + ' - cron-git: git push done.');
				}
   				if(callback !== undefined){
   					callback();
   				}
   			});
	}

	/* sync action */
	var sync = function(callback, params_pull, params_push){
		push(params_push);
		pull(params_pull);
		push(params_push, callback);
	}

	/* cron sync */
	var schedule = function(time, callback, params_pull, params_push){
		cron.scheduleJob(time, function(){
			console.log(new Date() + ' - cron-git: Scheduled sync begin.');
			sync(callback, params_pull, params_push);
		});
	}

	return o;
}
