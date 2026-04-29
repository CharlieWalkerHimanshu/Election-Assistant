import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /api/voting-steps', () => {
  it('returns 200 with an array of steps', async () => {
    const res = await request(app).get('/api/voting-steps');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('each step has required fields', async () => {
    const res = await request(app).get('/api/voting-steps');
    const steps: Record<string, unknown>[] = res.body.data;

    steps.forEach((step) => {
      expect(typeof step.step).toBe('number');
      expect(typeof step.title).toBe('string');
      expect(typeof step.description).toBe('string');
      expect(Array.isArray(step.details)).toBe(true);
    });
  });

  it('steps are in ascending order starting from 1', async () => {
    const res = await request(app).get('/api/voting-steps');
    const stepNumbers: number[] = res.body.data.map((s: { step: number }) => s.step);

    expect(stepNumbers[0]).toBe(1);
    stepNumbers.forEach((num, idx) => {
      if (idx > 0) expect(num).toBeGreaterThan(stepNumbers[idx - 1]);
    });
  });

  it('contains the 4 expected steps', async () => {
    const res = await request(app).get('/api/voting-steps');
    const titles: string[] = res.body.data.map((s: { title: string }) => s.title);

    expect(titles).toContain('Check Eligibility');
    expect(titles).toContain('Register to Vote');
    expect(titles).toContain('Find Your Polling Booth');
    expect(titles).toContain('Voting Day — Cast Your Vote');
  });

  it('step 2 (registration) includes a documents array', async () => {
    const res = await request(app).get('/api/voting-steps');
    const registrationStep = res.body.data.find(
      (s: { step: number }) => s.step === 2
    );

    expect(registrationStep).toBeDefined();
    expect(Array.isArray(registrationStep.documents)).toBe(true);
    expect(registrationStep.documents.length).toBeGreaterThan(0);
  });

  it('responds with JSON content-type', async () => {
    const res = await request(app).get('/api/voting-steps');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});
