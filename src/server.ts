import console from 'console';
import 'dotenv/config';
import { createServer } from 'http';
import { createUser, getbyId, getUsers } from './controlers/user-controler.js';

import { er404, mainMES } from './config.js';

const cl = (str: {} | string | number | []) => {
  console.log(str);
};
let i: number = 0;
const PORT = process.env.PORT || '5000';
const server = createServer((req, res) => {
  cl(`count res:${i++} to port ${PORT}`);
  if (req.url) {
    const reqArr: string[] = req.url.split('/');
    cl(reqArr);
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
      console.log(res.statusCode);
    } else if (reqArr[3] && req.method === 'GET') {
      cl(reqArr[3]);
      getbyId(req, res, reqArr[3]);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: er404 }));
    }
  } else {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: mainMES }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is runing on port: ${PORT}`);
});
