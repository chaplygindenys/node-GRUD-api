import { Console } from 'console';
import http from 'http';
import { validate, v4 } from 'uuid';

let workName = 'AAA';
let workId = '';
let workAge = 1;
let workHobbies = ['a'];

const loaderResponse = async (url) => {
  return new Promise((resolve, reject) => {
    console.log(url);
    http.get(`${url}`, (res) => {
      resolve(res);
    });
  });
};
const loaderPupPostResponse = async (options, data) => {
  console.log(options);
  console.log(data);
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      resolve(res);
    });
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.write(data);
    req.end();
  });
};
const loaderDeleteResponse = async (options) => {
  console.log(options);
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      resolve(res);
    });
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  });
};
const loaderResponseById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    http.get(`http://localhost:4000/api/users/${id}`, (res) => {
      resolve(res);
    });
  });
};
const PromiseBody = async (response) => {
  let ResBoby = '';
  return new Promise((resolve, reject) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      ResBoby += chunk;
    });
    response.on('end', () => {
      resolve(ResBoby);
    });
  });
};
describe('A', () => {
  console.log('A');
  it('should Get all records with a GET api/users request (an empty array is expected)', async () => {
    const url = 'http://localhost:4000/api/users';
    let ResBoby = '';
    const response = await loaderResponse(url);
    expect(response.statusCode).toBe(200);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      ResBoby += chunk;
    });
    response.on('end', () => {
      expect(ResBoby).toBe('[]');
    });
  });
});
describe('B', () => {
  console.log('B');
  it('should A new object is created by a POST api/users request (a response containing newly created record is expected) ', async () => {
    const data = JSON.stringify({
      name: workName,
      age: workAge,
      hobbies: workHobbies,
    });
    console.log(data);
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await loaderPupPostResponse(options, data);
    expect(response.statusCode).toBe(201);
    const ResBoby = await PromiseBody(response);

    const bodyParse = JSON.parse(ResBoby);
    workId = await bodyParse.id;
    workName = await bodyParse.name;
    workAge = await bodyParse.age;
    workHobbies = await bodyParse.hobbies;

    expect(validate(bodyParse.id)).toBe(true);
    expect(bodyParse.name).toBe(workName);
    expect(bodyParse.age).toBe(workAge);
    expect(Array.isArray(bodyParse.hobbies)).toBe(true);
  });
});
describe('C', () => {
  it('should: With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    const url = 'http://localhost:4000/api/users';

    // const response = await loaderResponse(url);
    // const resBody = await PromiseBody(response);
    // const { id, name, age, hobbies } = JSON.parse(resBody);

    const responseById = await loaderResponseById(workId);
    expect(responseById.statusCode).toBe(200);
    const resBodyById = await PromiseBody(responseById);
    const bodyParse = JSON.parse(resBodyById);
    expect(bodyParse.id).toBe(workId);
    expect(bodyParse.name).toBe(workName);
    expect(bodyParse.age).toBe(workAge);
    expect(bodyParse.hobbies[0]).toBe(workHobbies[0]);
  });
});
describe('D', () => {
  it('should: We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id) ', async () => {
    const dataUpdate = {
      name: 'UP',
      age: 100,
      hobbies: ['NEWHobby'],
    };

    // const response = await loaderResponse(url);
    // expect(response.statusCode).toBe(200);
    // const resBody = await PromiseBody(response);
    // console.log(resBody);
    // const bodyMassive = JSON.parse(resBody);
    // console.log(bodyMassive[0].id);

    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/${workId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const dataJson = JSON.stringify(dataUpdate);
    const response = await loaderPupPostResponse(options, dataJson);
    expect(response.statusCode).toBe(200);
    const ResBoby = await PromiseBody(response);

    const bodyParse = JSON.parse(ResBoby);

    expect(bodyParse.id).toBe(workId);
    expect(bodyParse.name).toBe(dataUpdate.name);
    expect(bodyParse.age).toBe(dataUpdate.age);
    expect(bodyParse.hobbies[0]).toBe(dataUpdate.hobbies[0]);
  });
});
describe('E', () => {
  it('should: With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected) ', async () => {
    const url = 'http://localhost:4000/api/users';
    const workid = workId;
    console.log(`DELETE${workId}`);
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/${workid}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const responseUpdate = await loaderDeleteResponse(options);
    expect(responseUpdate.statusCode).toBe(204);
  });
});
describe('F', () => {
  it('should: With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)  ', async () => {
    const responseById = await loaderResponseById(workId);
    expect(responseById.statusCode).toBe(404);
  });
});
