import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/voting-info', () => {
  it('returns 200 with data for a known city name', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Delhi' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('returns correct region field for Delhi', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Delhi' });

    expect(res.body.data.region).toBe('Delhi');
  });

  it('returns required fields in response data', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Maharashtra' });

    const d = res.body.data;
    expect(d).toHaveProperty('region');
    expect(d).toHaveProperty('state');
    expect(d).toHaveProperty('pollingBoothFinderUrl');
    expect(d).toHaveProperty('stateElectionCommissionUrl');
    expect(d).toHaveProperty('voterHelpline');
    expect(d).toHaveProperty('additionalLinks');
    expect(d).toHaveProperty('tip');
  });

  it('is case-insensitive (lowercase query)', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'karnataka' });

    expect(res.status).toBe(200);
    expect(res.body.data.region).toBe('Karnataka');
  });

  it('matches by PIN code prefix', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: '110001' }); // Delhi PIN

    expect(res.status).toBe(200);
    expect(res.body.data.region).toBe('Delhi');
  });

  it('returns 404 for unknown region', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Atlantis' });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('returns 422 when query param is missing', async () => {
    const res = await request(app).get('/api/voting-info');
    expect(res.status).toBe(422);
  });

  it('returns 422 for a single character query (too short)', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'D' });

    expect(res.status).toBe(422);
  });

  it('returns 422 for query with special characters', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Delhi<script>' });

    expect(res.status).toBe(422);
  });

  it('additionalLinks is a non-empty array with label and url', async () => {
    const res = await request(app)
      .get('/api/voting-info')
      .query({ query: 'Gujarat' });

    expect(res.status).toBe(200);
    const links = res.body.data.additionalLinks as { label: string; url: string }[];
    expect(Array.isArray(links)).toBe(true);
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => {
      expect(l).toHaveProperty('label');
      expect(l).toHaveProperty('url');
    });
  });
});
