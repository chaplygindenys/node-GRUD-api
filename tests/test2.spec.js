import {
  loaderDeleteResponse,
  loaderPupPostResponse,
  loaderResponse,
  loaderResponseById,
} from './test.spec.js';

describe('A ', () => {
  it('should: should Get all records with a GET api/error request (404  + boby.message) ', async () => {
    const url = 'http://localhost:4000/api/error';

    const response = await loaderResponse(url);
    expect(response.statusCode).toBe(404);
  });
});
describe('B ', () => {
  it('should: A new object created by a POST api/users with {"error"} request ( error 400 is expected)  ', async () => {
    const data = JSON.stringify({
      error: 'error',
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
    const response = await loaderPupPostResponse(options, data);
    expect(response.statusCode).toBe(400);
  });
});
describe('C ', () => {
  it('should:  With a GET api/user/error request, we try to get the created record by its error-id (error 400 is expected) ', async () => {
    const url = 'http://localhost:4000/api/users';

    const responseById = await loaderResponseById('error');
    expect(responseById.statusCode).toBe(400);
  });
});
describe('D ', () => {
  it('should: We try to update the created record with a PUT api/users/error request (error 400 is expected) ', async () => {
    const dataUpdate = {
      name: 'UP',
      age: 100,
      hobbies: ['NEWHobby'],
    };
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/error`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const dataJson = JSON.stringify(dataUpdate);
    const response = await loaderPupPostResponse(options, dataJson);
    expect(response.statusCode).toBe(400);
  });
});
describe('E ', () => {
  it('should:  With a DELETE api/users/error request, we delete the created object by id (error 400 is expected) ', async () => {
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/error`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const responseUpdate = await loaderDeleteResponse(options);
    expect(responseUpdate.statusCode).toBe(400);
  });
});
