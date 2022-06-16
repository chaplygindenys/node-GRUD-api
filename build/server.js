import console from 'console';
import 'dotenv/config';
import { createServer } from 'http';
import { createUser, deletebyId, getbyId, getUsers, updatebyId, } from './controlers/user-controler.js';
import { er404, mainMES } from './config.js';
const cl = (str) => {
    console.log(str);
};
let i = 0;
const PORT = process.env.PORT || '5000';
export const server = createServer((req, res) => {
    cl(`count res:${i++} to port ${PORT}`);
    if (req.url) {
        const reqArr = req.url.split('/');
        cl(reqArr);
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
            cl(reqArr[3]);
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
server.listen(PORT, () => {
    console.log(`Server is runing on port: ${PORT}`);
});
