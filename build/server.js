import console from 'console';
import 'dotenv/config';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { pipeline } from 'stream/promises';
const str = 'Good day!!';
const buf = Buffer.from('BASIC=basic');
console.log(buf);
const Stream = createReadStream('./package.json');
pipeline(Stream, stdout);
console.log(str);
const env = process.env.SECRET_KEY;
if (env) {
    process.stdout.write(env);
}
