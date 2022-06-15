import { rejects } from 'assert';
import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { users } from '../users/users.js';
import { User, UserWithoutId } from '../types/user.js';

export const findAll = () => {
  return new Promise((resolve, rejects) => {
    resolve(users);
  });
};
export const findById = (id: string) => {
  return new Promise((resolve, rejects) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  });
};
export const createWithId = ({ name, age, hobbies }: UserWithoutId) => {
  return new Promise((resolve, rejects) => {
    const total = users.push({ id: uuidV4(), name, age, hobbies });
    resolve(users[+total - 1]);
  });
};
