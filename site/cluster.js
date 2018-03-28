let cluster = require('cluster');
let app = require('./app.js');

let startWorker = ()=>{
	let worker = cluster.fork();
	console.log(`CLUSTER:create Worker ${worker.id}.`);
};

if(cluster.isMaster){
	require('os').cpus().forEach(()=>{
		startWorker();
	});

	cluster.on('disconnect',(worker)=>{
		console.log(`CLUSTER:Worker ${worker.id} disconnect from the cluster.`);
	});

	cluster.on('exit',(worker,code,signal)=>{
		console.log(`CLUSTER:Worker ${worker.id} died width exit code ${code}(${signal})`);
		startWorker();
	});

	console.log(app.log);
}else{
	app.startServer();
}