import { v4 as uuidV4 } from 'uuid';
import { users } from '../users/users.js';
export const findAll = () => {
    return new Promise((resolve, rejects) => {
        resolve(users);
    });
};
export const findById = (id) => {
    return new Promise((resolve, rejects) => {
        const user = users.find((u) => u.id === id);
        resolve(user);
    });
};
export const createWithId = ({ name, age, hobbies }) => {
    return new Promise((resolve, rejects) => {
        const total = users.push({ id: uuidV4(), name, age, hobbies });
        resolve(users[+total - 1]);
    });
};
