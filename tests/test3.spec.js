describe('A ', () => {
  it('should:  2 new objects created by POST api/users with  request ( 2 responses containing  newly created records with diferent id is expected)  ', () => {});
});
describe('B ', () => {
  it('should: should Get 2 records with a GET api/users request ( 2 objects  are expected ) ', () => {});
});
describe('C ', () => {
  it('should:  With a DELETE api/users/{userID} request, we delete the created first object by id (statusCode 204 is expected) ', () => {});
});
describe('D ', () => {
  it('should:  With a GET api/user/{userID} request, we try to get the second created record by its  (statusCode 204 and the created record is expected) ', () => {});
});
describe('E ', () => {
  it('should: We try to update the firs created record with a PUT api/users/{userID} request (error 404 is expected) ', () => {});
});
describe('F ', () => {
  it('should:  With a DELETE api/users/{userID} request, we delete the second created object by id (statusCode 204  is expected) ', () => {});
});
describe('J ', () => {
  it('should: Try to get records with a GET api/users request ( an empty array is expected ) ', () => {});
});
