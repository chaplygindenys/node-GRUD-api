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
        cluster.fork();
    }
}
else {
    const workerId = cluster.worker?.id;
    console.log(`Worker: ${workerId}, pid:${process.pid}, port${PORT}`);
    server.listen(PORT, () => {
        console.log(`Server is runing on port: ${PORT}`);
    });
}
