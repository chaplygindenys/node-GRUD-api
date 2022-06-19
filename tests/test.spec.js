import { V4MAPPED } from 'dns';
import http from 'http';
import { validate, v4 } from 'uuid';

let workName = 'AAA';
let workId = '';
let workAge = 1;
let workHobbies = ['a'];

export const loaderResponse = async (url) => {
  return new Promise((resolve, reject) => {
    http.get(`${url}`, (res) => {
      resolve(res);
    });
  });
};
export const loaderPupPostResponse = async (options, data) => {
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
export const loaderDeleteResponse = async (options) => {
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
export const loaderResponseById = async (id) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4000/api/users/${id}`, (res) => {
      resolve(res);
    });
  });
};
export const PromiseBody = async (response) => {
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
  it('should A new object is created by a POST api/users request (a response containing newly created record is expected) ', async () => {
    const data = JSON.stringify({
      name: workName,
      age: workAge,
      hobbies: workHobbies,
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
    const workid = workId;
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

//--------------------------scen 2

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
describe('F ', () => {
  it('should:  With a DELETE api/users/newV4 request, we delete the created object by id (error 404 is expected) ', async () => {
    const newid = v4();
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/${newid}`,
      method: 'DELETE',
    };
    const responseDelete = await loaderDeleteResponse(options);
    expect(responseDelete.statusCode).toBe(404);
  });
});
// -----------------------scen3

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
    };
    const responseUpdate = await loaderDeleteResponse(options);
    expect(responseUpdate.statusCode).toBe(204);
  });
});
