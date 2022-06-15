import { UserWithoutId } from '../types/user';

export const newUserWithoutId = (body: string): UserWithoutId | undefined => {
  try {
    const { name, age, hobbies } = JSON.parse(body);
    const newUser = {
      name: name,
      age: age,
      hobbies: hobbies,
    };
    if (
      typeof newUser.name === 'string' &&
      typeof newUser.age === 'number' &&
      Array.isArray(newUser.hobbies)
    ) {
      return newUser;
    }
  } catch (error) {
    if (error) {
      return undefined;
    }
  }
};
