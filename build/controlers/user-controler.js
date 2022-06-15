import { validate as uuidValidate } from 'uuid';
import { er400, er404, er500 } from '../config.js';
import { createWithId, findAll, findById } from '../models/user-model.js';
export const getUsers = async (req, res) => {
    try {
        const users = await findAll();
        if (users) {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(er404));
        }
    }
    catch (error) {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(er500));
    }
};
export const getbyId = async (req, res, id) => {
    try {
        if (uuidValidate(id)) {
            const user = await findById(id);
            if (user) {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(er404));
            }
        }
        else {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(er400));
        }
    }
    catch (error) {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(er500));
    }
};
export const createUser = async (req, res) => {
    try {
        const promiseBody = (req) => {
            return new Promise((resolve, reject) => {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                    req.on('end', () => resolve(body));
                });
            });
        };
        const body = await promiseBody(req);
        const { name, age, hobbies } = JSON.parse(body);
        const newUser = {
            name: name,
            age: age,
            hobbies: hobbies,
        };
        if (typeof newUser.name === 'string' &&
            typeof newUser.age === 'number' &&
            Array.isArray(newUser.hobbies)) {
            console.log(newUser);
            const user = await createWithId(newUser);
            if (user) {
                res.writeHead(201, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(user));
            }
            else {
            }
        }
        else {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(er400));
        }
    }
    catch (error) {
        console.error(error);
    }
};
