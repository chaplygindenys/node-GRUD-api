import { validate } from 'uuid';
import {
  loaderDeleteResponse,
  loaderPupPostResponse,
  loaderResponse,
  loaderResponseById,
  PromiseBody,
} from './test.spec.js';

let workName1 = 'AAA';
let workId1 = '';
let workAge1 = 1;
let workHobbies1 = ['a'];
let workName2 = 'BBB';
let workId2 = '';
let workAge2 = 2;
let workHobbies2 = ['b'];
describe('A ', () => {
  it('should:  2 new objects created by POST api/users with  request ( 2 responses containing  newly created records with diferent id is expected)  ', async () => {
    const data1 = JSON.stringify({
      name: workName1,
      age: workAge1,
      hobbies: workHobbies1,
    });
    const data2 = JSON.stringify({
      name: workName2,
      age: workAge2,
      hobbies: workHobbies2,
    });
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response1 = await loaderPupPostResponse(options, data1);
    expect(response1.statusCode).toBe(201);
    const ResBoby1 = await PromiseBody(response1);

    const bodyParse1 = JSON.parse(ResBoby1);
    workId1 = await bodyParse1.id;

    const response2 = await loaderPupPostResponse(options, data2);
    expect(response2.statusCode).toBe(201);
    const ResBoby2 = await PromiseBody(response2);

    const bodyParse2 = JSON.parse(ResBoby2);
    workId2 = await bodyParse2.id;

    expect(validate(bodyParse1.id) === validate(bodyParse2.id)).toBe(true);

    expect(bodyParse1.id === bodyParse2.id).toBe(false);
  });
});
describe('B ', () => {
  it('should: should Get 2 records with a GET api/users request ( 2 objects  are expected ) ', async () => {});
});
describe('C ', () => {
  it('should:  With a DELETE api/users/{userID} request, we delete the created first object by id (statusCode 204 is expected) ', async () => {
    const workid = workId1;
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
describe('D ', () => {
  it('should:  With a GET api/user/{userID} request, we try to get the second created record by its  (statusCode 204 and the created record is expected) ', async () => {
    const url = 'http://localhost:4000/api/users';

    const responseById = await loaderResponseById(workId2);
    expect(responseById.statusCode).toBe(200);
    const resBodyById = await PromiseBody(responseById);
    const bodyParse = JSON.parse(resBodyById);
    expect(bodyParse.id).toBe(workId2);
    expect(bodyParse.name).toBe(workName2);
    expect(bodyParse.age).toBe(workAge2);
    expect(bodyParse.hobbies[0]).toBe(workHobbies2[0]);
  });
});
describe('E ', () => {
  it('should: We try to update the firs created record with a PUT api/users/{userID} request (error 404 is expected) ', async () => {
    const dataUpdate = {
      name: 'UP',
      age: 100,
      hobbies: ['NEWHobby'],
    };
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/${workId1}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const dataJson = JSON.stringify(dataUpdate);
    const response = await loaderPupPostResponse(options, dataJson);
    expect(response.statusCode).toBe(404);
  });
});
describe('F ', () => {
  it('should:  With a DELETE api/users/{userID} request, we delete the second created object by id (statusCode 204  is expected) ', async () => {
    const workid = workId2;
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
describe('J ', () => {
  it('should: Try to get records with a GET api/users request ( an empty array is expected ) ', async () => {
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
