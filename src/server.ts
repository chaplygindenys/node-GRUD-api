import console from 'console';
import 'dotenv/config';
import { createReadStream } from 'fs';
import { createServer } from 'http';
import { stdout } from 'process';
import { pipeline } from 'stream/promises';
const cl = (str: {} | string | number | []) => {
  console.log(str);
};
let i: number = 0;
const PORT = process.env.PORT || '5000';
const server = createServer((req, res) => {
  cl(`count res:${i++} to port ${PORT}`);
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write('<h1>hi</h1>');
  res.end();
});
// const str = 'Good day!!';
// const buf = Buffer.from('BASIC=basic');
// console.log(buf);
// const Stream = createReadStream('./package.json');
// pipeline(Stream, stdout);
// console.log(str);
// const env: string | undefined = process.env.SECRET_KEY;
// if (env) {
//   process.stdout.write(env);
// }

server.listen(PORT, () => {
  console.log(`Server is runing on port: ${PORT}`);
});
