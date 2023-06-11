import { onRequest } from 'firebase-functions/v2/https';
import * as supertest from 'supertest';
import { app } from '../src/index'

const request = supertest(onRequest(app));

describe('Express App', () => {
  it('should return "Is Alive!" when accessing /status', async () => {
    const response = await request.get('/status');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Is Alive!' });
  });

  it('should return 404 when accessing an unknown route', async () => {
    const response = await request.get('/unknown');

    expect(response.status).toBe(404);
  });
});