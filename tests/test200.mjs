import { request } from 'http';
import supertest from 'supertest';
import { isExportDeclaration } from 'typescript';
import server from '../build/server.js';

describe('GET /api/users', () => {
  describe('Get all records with a GET api/users request (an empty array is expected) ', () => {
    test('should Get all records with a GET api/users request (an empty array is expected)', async () => {
      const response = await request(server).get('/api/users');
      expect(response.statusCode).toBe(200);
    });
    // test('should A new object is created by a POST api/users request (a response containing newly created record is expected) ', async () => {
    //   const response = request(server)
    //     .post('/api/users')
    //     .send({
    //       name: 'A',
    //       age: 1,
    //       hobbies: ['foo'],
    //     });
    // });

    // With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)
    // With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
  });
  describe('when body is missing ', () => {
    // should respond with a status code of 400
  });
});
