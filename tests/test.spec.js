import http from 'http';
import { validate, v4 } from 'uuid';
const loaderResponse = () => {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:4000/api/users', (res) => {
      resolve(res);
    });
  });
};
const loaderResponseById = (id) => {
  return new Promise((resolve, reject) => {
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
describe('/api/users', () => {
  describe('Get all records with a GET api/users request (an empty array is expected) ', () => {
    it('should Get all records with a GET api/users request (an empty array is expected)', async () => {
      let ResBoby = '';
      const response = await loaderResponse();
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
  it('should A new object is created by a POST api/users request (a response containing newly created record is expected) ', async () => {
    const postData = JSON.stringify({
      name: 'A',
      age: 1,
      hobbies: ['foo'],
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
    let ResBoby = '';
    const loaderResponse = () => {
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          resolve(res);
        });
        req.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
        });
        req.write(postData);
        req.end();
      });
    };
    const response = await loaderResponse();

    expect(response.statusCode).toBe;
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      ResBoby += chunk;
    });
    response.on('end', () => {
      const bodyParse = JSON.parse(ResBoby);
      expect(validate(bodyParse.id)).toBe(true);
      expect(bodyParse.name).toBe('A');
      expect(bodyParse.age).toBe(1);
      expect(Array.isArray(bodyParse.hobbies)).toBe(true);
    });
  });
  it('should: With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    const response = await loaderResponse();
    const resBody = await PromiseBody(response);
    const { id, name, age, hobbies } = JSON.parse(resBody);
    const responseById = await loaderResponseById(id);
    expect(response.statusCode).toBe(200);
    const resBodyById = await PromiseBody(responseById);
    const bodyParse = JSON.parse(resBodyById);
    expect(bodyParse.id).toBe(id);
    expect(bodyParse.name).toBe(name);
    expect(bodyParse.age).toBe(age);
    expect(bodyParse.hobbies).toBe(hobbies);
  });
  it('should: We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id) ', async () => {
    const postData = JSON.stringify({
      name: 'UP',
      age: 100,
      hobbies: ['NEWHobby'],
    });

    let ResBoby = '';
    const response = await loaderResponse();
    expect(response.statusCode).toBe(200);
    const resBody = await PromiseBody(response);
    console.log(resBody);
    const bodyMassive = JSON.parse(resBody);
    console.log(bodyMassive[0].id);
    const options = {
      host: '127.0.0.1',
      port: 4000,
      path: `/api/users/${bodyMassive[0].id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const loaderUpdateResponse = () => {
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          resolve(res);
        });
        req.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
        });
        req.write(postData);
        req.end();
      });
    };
    const responseUpdate = await loaderUpdateResponse();
    // console.log(responseUpdate);
    expect(responseUpdate.statusCode).toBe(200);
    responseUpdate.setEncoding('utf8');
    responseUpdate.on('data', (chunk) => {
      ResBoby += chunk;
    });
    response.on('end', () => {
      const bodyParse = JSON.parse(ResBoby);
      expect(bodyParse.id).toBe(bodyMassive[0].id);
      expect(bodyParse.name).toBe(bodyMassive[0].name);
      expect(bodyParse.age).toBe(bodyMassive[0].age);
      expect(bodyParse.hobbies).toBe(bodyMassive[0].hobbies);
    });
  });
  describe('when body is missing ', () => {});
});
