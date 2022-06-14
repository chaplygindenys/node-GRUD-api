import console from 'console';
import 'dotenv/config';
import { createServer } from 'http';
import { users } from './users/users.js';
import { er404 } from './config.js';
const cl = (str) => {
    console.log(str);
};
let i = 0;
const PORT = process.env.PORT || '5000';
const server = createServer((req, res) => {
    cl(`count res:${i++} to port ${PORT}`);
    cl(req.rawHeaders);
    if (req.url === '/api/users') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: er404 }));
    }
});
server.listen(PORT, () => {
    console.log(`Server is runing on port: ${PORT}`);
});
