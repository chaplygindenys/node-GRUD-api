import { v4 as uuidV4 } from 'uuid';
import cluster from 'cluster';
import process from 'process';
let users = [];
export const findAll = () => {
    return new Promise((resolve, rejects) => {
        if (cluster.isWorker) {
            process.on('message', (str) => {
                console.log('allWorker');
                resolve(JSON.parse(str));
            });
            if (process.send)
                process.send('getUsers');
        }
        if (cluster.isPrimary) {
            console.log('allPrime');
            resolve(users);
        }
    });
};
export const findById = (id) => {
    return new Promise((resolve, rejects) => {
        if (cluster.isWorker) {
            process.on('message', (str) => {
                users = JSON.parse(str);
                const user = users.find((u) => u.id === id);
                console.log('byidWorker');
                resolve(user);
            });
            if (process.send)
                process.send('getUsers');
        }
        if (cluster.isPrimary) {
            console.log('byidPrime');
            const user = users.find((u) => u.id === id);
            resolve(user);
        }
    });
};
export const createWithId = ({ name, age, hobbies }) => {
    return new Promise((resolve, rejects) => {
        if (cluster.isWorker) {
            process.on('message', (str) => {
                users = JSON.parse(str);
                const total = users.push({ id: uuidV4(), name, age, hobbies });
                if (process.send)
                    process.send(JSON.stringify(users));
                console.log('createWorker');
                resolve(users[+total - 1]);
            });
            if (process.send)
                process.send('getUsers');
        }
        if (cluster.isPrimary) {
            console.log('createPrime');
            const total = users.push({ id: uuidV4(), name, age, hobbies });
            resolve(users[+total - 1]);
        }
    });
};
export const updateById = (id, { name, age, hobbies }) => {
    return new Promise((resolve, rejects) => {
        if (cluster.isWorker) {
            process.on('message', (str) => {
                users = JSON.parse(str);
                const index = users.findIndex((p) => p.id === id);
                users[index] = { id, name, age, hobbies };
                if (process.send)
                    process.send(JSON.stringify(users));
                console.log('updateWorker');
                resolve(users[index]);
            });
            if (process.send)
                process.send('getUsers');
        }
        if (cluster.isPrimary) {
            console.log('updatePrime');
            const index = users.findIndex((p) => p.id === id);
            users[index] = { id, name, age, hobbies };
            resolve(users[index]);
        }
    });
};
export const deleteById = (id) => {
    return new Promise((resolve, rejects) => {
        if (cluster.isWorker) {
            process.on('message', (str) => {
                users = JSON.parse(str);
                users = users.filter((p) => p.id !== id);
                if (process.send)
                    process.send(JSON.stringify(users));
                console.log('deleteWorker');
                resolve(users);
            });
            if (process.send)
                process.send('getUsers');
        }
        if (cluster.isPrimary) {
            console.log('deletePrime');
            users = users.filter((p) => p.id !== id);
            resolve(users);
        }
    });
};
