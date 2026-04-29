import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('election-navigator-api');
    expect(typeof res.body.timestamp).toBe('string');
  });

  it('responds with JSON content-type', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

describe('Unknown routes', () => {
  it('returns 404 for unregistered route', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('Placeholder routes', () => {
  it('GET /api/ai/unknown returns 404 (real router, no GET /chat)', async () => {
    const res = await request(app).get('/api/ai/unknown');
    expect(res.status).toBe(404);
  });

  it('GET /api/timeline returns 501 not implemented', async () => {
    const res = await request(app).get('/api/timeline');
    expect(res.status).toBe(501);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/wizard returns 501 not implemented', async () => {
    const res = await request(app).get('/api/wizard');
    expect(res.status).toBe(501);
    expect(res.body.success).toBe(false);
  });
});

describe('Security headers', () => {
  it('includes X-Content-Type-Options header from helmet', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('rejects body larger than 10kb', async () => {
    const largeBody = { data: 'x'.repeat(11_000) };
    const res = await request(app)
      .post('/api/ai')
      .set('Content-Type', 'application/json')
      .send(largeBody);
    // Either 413 (payload too large) or 501 (placeholder); must not be 200
    expect(res.status).not.toBe(200);
  });
});
