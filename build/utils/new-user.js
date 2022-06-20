export const newUserWithoutId = (body) => {
    try {
        const { name, age, hobbies } = JSON.parse(body);
        const newUser = {
            name: name,
            age: age,
            hobbies: hobbies,
        };
        if (typeof newUser.name === 'string' &&
            typeof newUser.age === 'number' &&
            Array.isArray(newUser.hobbies)) {
            return newUser;
        }
    }
    catch (error) {
        if (error) {
            return undefined;
        }
    }
};
