import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import 'dotenv/config';
import { server } from './app.js';
const PORT = process.env.PORT || '5000';
if (cluster.isPrimary) {
    const countCpus = cpus().length;
    console.log(`master${process.pid}start ${countCpus}forks `);
    for (let i = 0; i < countCpus; i++) {
        cluster.schedulingPolicy = cluster.SCHED_RR;
        cluster.fork();
    }
    let users = '[]';
    for (const id in cluster.workers) {
        console.log(`Prime wate message from workr${id}`);
        const worker = cluster.workers[id];
        worker?.on('message', (mes) => {
            if (mes === 'getUsers') {
                worker.send(users, (err) => {
                    if (err) {
                        console.log('REEE');
                    }
                });
            }
            else {
                users = mes;
            }
        });
    }
}
else {
    const workerId = cluster.worker?.id;
    server.listen(PORT, () => {
        console.log(`Server is runing on port: ${PORT}`);
    });
}
