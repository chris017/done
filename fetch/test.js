import '@testing-library/jest-dom/extend-expect';

const server = require('./app.js');
const supertest = require('supertest');
let requestWithSupertest;

describe('app.js', () => {

  beforeEach(() => {
    requestWithSupertest = supertest(server);
  })


  it('GET /api/todos should show all users', async () => {
    const res = await requestWithSupertest.get('/api/todos');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual([{ "name": "Chris" }])
  });


  it('GET /api/todo/1 should return user', async () => {
    const res = await requestWithSupertest.get('/api/todo/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ id: "1", name: "Christian Schmid" })
  });


  it('GET /api/todo/2 should return 404', async () => {
    const res = await requestWithSupertest.get('/api/todo/2 ');
    expect(res.status).toEqual(404);
  });

  it('POST /api/todo should add new user', async () => {
    await requestWithSupertest.post('/api/todo ');

    const res = await requestWithSupertest.get('/api/todo/2');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ id: "2", name: "Lea" })
  });

})