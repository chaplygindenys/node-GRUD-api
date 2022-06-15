import { v4 as uuidV4 } from 'uuid';
let users = [];
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
export const updateById = (id, { name, age, hobbies }) => {
    return new Promise((resolve, rejects) => {
        const index = users.findIndex((p) => p.id === id);
        users[index] = { id, name, age, hobbies };
        resolve(users[index]);
    });
};
export const deleteById = (id) => {
    return new Promise((resolve, rejects) => {
        console.log(id);
        users = users.filter((p) => p.id !== id);
        resolve(users);
    });
};
