import { v4 as uuidV4 } from 'uuid';

export type User = {
  id: string | typeof uuidV4;
  name: string;
  age: number;
  hobbies: string[] | [];
};
export type UserWithoutId = {
  name: string;
  age: number;
  hobbies: string[] | [];
};
