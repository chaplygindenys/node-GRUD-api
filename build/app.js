import process from 'process';
import 'dotenv/config';
import { createServer } from 'http';
import { createUser, deletebyId, getbyId, getUsers, updatebyId, } from './controlers/user-controler.js';
import { er404, mainMES } from './config.js';
export const server = createServer((req, res) => {
    res.setHeader('Process-Id', process.pid);
    if (req.url) {
        const reqArr = req.url.split('/');
        if (req.url === '/api/users' && req.method === 'GET') {
            getUsers(req, res);
        }
        else if (reqArr[3] && req.method === 'GET') {
            getbyId(req, res, reqArr[3]);
        }
        else if (req.url === '/api/users' && req.method === 'POST') {
            createUser(req, res);
        }
        else if (reqArr[3] && req.method === 'PUT') {
            updatebyId(req, res, reqArr[3]);
        }
        else if (reqArr[3] && req.method === 'DELETE') {
            deletebyId(req, res, reqArr[3]);
        }
        else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: er404 }));
        }
    }
    else {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: mainMES }));
    }
});
