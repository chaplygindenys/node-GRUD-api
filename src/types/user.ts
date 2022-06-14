import { RandomUUIDOptions } from 'crypto';

export interface User {
  id: string | RandomUUIDOptions;
  name: string;
  age: number;
  hobbies: string | string[] | [];
}
