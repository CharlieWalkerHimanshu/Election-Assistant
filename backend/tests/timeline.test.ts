import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/timeline', () => {
  it('returns 200 with an array of phases', async () => {
    const res = await request(app).get('/api/timeline');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('each phase has required fields', async () => {
    const res = await request(app).get('/api/timeline');
    const phases: Record<string, unknown>[] = res.body.data;

    phases.forEach((phase) => {
      expect(typeof phase.phase).toBe('string');
      expect(typeof phase.date).toBe('string');
      expect(typeof phase.description).toBe('string');
      expect(typeof phase.details).toBe('string');
      expect(typeof phase.icon).toBe('string');
    });
  });

  it('returns phases for country=india (explicit)', async () => {
    const res = await request(app).get('/api/timeline?country=india');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('returns 404 for an unsupported country', async () => {
    const res = await request(app).get('/api/timeline?country=atlantis');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('returns 422 for invalid country param (numbers / special chars)', async () => {
    const res = await request(app).get('/api/timeline?country=12345!');

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('contains Registration, Campaign, Voting, Results phases', async () => {
    const res = await request(app).get('/api/timeline');
    const phases: string[] = res.body.data.map((p: { phase: string }) => p.phase);

    expect(phases).toContain('Registration');
    expect(phases).toContain('Campaign');
    expect(phases).toContain('Voting');
    expect(phases).toContain('Results');
  });

  it('phases are in chronological order', async () => {
    const res = await request(app).get('/api/timeline');
    const dates: string[] = res.body.data.map((p: { date: string }) => p.date);

    const sorted = [...dates].sort();
    expect(dates).toEqual(sorted);
  });
});
