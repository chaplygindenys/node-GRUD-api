import http from 'http';
import { validate, v4 } from 'uuid';
describe('/api/users', () => {
  describe('Get all records with a GET api/users request (an empty array is expected) ', () => {
    it('should Get all records with a GET api/users request (an empty array is expected)', async () => {
      let ResBoby = '';
      const loaderResponse = () => {
        return new Promise((resolve, reject) => {
          http.get('http://localhost:4000/api/users', (res) => {
            resolve(res);
          });
        });
      };
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
  describe('when body is missing ', () => {});
});
