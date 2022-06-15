import { v4 as uuidV4 } from 'uuid';
import { User, UserWithoutId } from '../types/user.js';
let users: User[] = [];

export const findAll = () => {
  return new Promise((resolve, rejects) => {
    resolve(users);
  });
};
export const findById = (id: string): Promise<User | undefined> => {
  return new Promise((resolve, rejects) => {
    const user: User | undefined = users.find((u) => u.id === id);
    resolve(user);
  });
};
export const createWithId = ({ name, age, hobbies }: UserWithoutId) => {
  return new Promise((resolve, rejects) => {
    const total = users.push({ id: uuidV4(), name, age, hobbies });
    resolve(users[+total - 1]);
  });
};
export const updateById = (
  id: string,
  { name, age, hobbies }: UserWithoutId
) => {
  return new Promise((resolve, rejects) => {
    const index = users.findIndex((p) => p.id === id);
    users[index] = { id, name, age, hobbies };
    resolve(users[index]);
  });
};
export const deleteById = (id: string) => {
  return new Promise((resolve, rejects) => {
    console.log(id);
    users = users.filter((p) => p.id !== id);
    resolve(users);
  });
};
