import console from 'console';
import http from 'http';
import { validate as uuidValidate } from 'uuid';

import { er400, er404, er500, erpost400 } from '../config.js';
import {
  createWithId,
  deleteById,
  findAll,
  findById,
  updateById,
} from '../models/user-model.js';
import { User, UserWithoutId } from '../types/user.js';
import { loader } from '../utils/loader.js';
import { newUserWithoutId } from '../utils/new-user.js';

// @dest  Get all users
// @rout  GET  /api/users
export const getUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> => {
  try {
    const users = await findAll();
    if (users) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(users));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er404));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(er500));
  }
};
// @dest  Get singl user
// @rout  GET  /api/users/${userId}
export const getbyId = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> => {
  try {
    if (uuidValidate(id)) {
      const user = await findById(id);
      if (user) {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(er404));
      }
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er400));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(er500));
  }
};
// @dest  Create a Product
// @rout  POST  /api/users
export const createUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> => {
  try {
    const body: string | undefined = await loader(req);
    if (!body) {
      throw '400';
    }
    const newUser: UserWithoutId | undefined = newUserWithoutId(body);
    if (!newUser) {
      throw '400';
    }
    const user = await createWithId(newUser);
    if (user) {
      res.writeHead(201, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      throw '400';
    }
  } catch (error) {
    if (error === '400') {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(erpost400));
    } else {
      console.log(error);
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er500));
    }
  }
};
// @dest  Update singl user
// @rout  PUT  /api/users/${userId}
export const updatebyId = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> => {
  try {
    if (!uuidValidate(id)) {
      throw '400';
    }
    const user: User | undefined = await findById(id);
    if (!user) {
      throw '404';
    }

    const body: string | undefined = await loader(req);
    if (!body) {
      throw '400';
    }
    const newUser: UserWithoutId | undefined = newUserWithoutId(body);
    if (!newUser) {
      throw '400';
    }
    console.log(newUser);
    const upUser = await updateById(id, newUser);
    if (upUser) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(upUser));
    } else {
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er500));
    }
  } catch (err) {
    if (err === '404') {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er404));
    } else if (err === '400') {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er400));
    } else {
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er500));
    }
  }
};
// @dest  Delete singl user
// @rout  DELETE  /api/users/${userId}
export const deletebyId = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
): Promise<void> => {
  try {
    if (uuidValidate(id)) {
      const user: User | undefined = await findById(id);
      if (user) {
        deleteById(id);
        res.writeHead(204, { 'Content-type': 'application/json' });
        res.end();
      } else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(er404));
      }
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(er400));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(er500));
  }
};
