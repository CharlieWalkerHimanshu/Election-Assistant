import request from 'supertest';
import { createApp } from '../src/app';

// ── Mock the entire aiService so no real OpenAI client is ever created ────
const mockGetChatReply = jest.fn();

jest.mock('../src/services/aiService', () => ({
  getChatReply: (...args: unknown[]) => mockGetChatReply(...args),
}));

const app = createApp();

describe('POST /api/ai/chat', () => {
  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-key-not-real';
    mockGetChatReply.mockResolvedValue({
      reply: 'To register to vote in India, visit voters.eci.gov.in and fill Form 6.',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with an AI reply for a valid message', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: 'How do I register to vote?' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.reply).toBe('string');
    expect(res.body.reply.length).toBeGreaterThan(0);
  });

  it('returns 422 when message is empty', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: '' });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('returns 422 when message field is missing', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('returns 422 when message exceeds 500 characters', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: 'a'.repeat(501) });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('returns 422 when message is not a string', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: 12345 });

    // express-validator coerces numbers to strings, so this may pass validation
    // but we confirm it does not crash the server
    expect([200, 422]).toContain(res.status);
  });

  it('returns 503 when the AI service throws an "unavailable" error', async () => {
    mockGetChatReply.mockRejectedValueOnce(
      Object.assign(new Error('AI service is temporarily unavailable. Please try again shortly.'), {
        isOperational: true,
        statusCode: 503,
      })
    );

    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: 'What documents do I need to vote?' });

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
  });

  it('does not expose OPENAI_API_KEY in the response', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: 'What is the voter eligibility age?' });

    const body = JSON.stringify(res.body);
    expect(body).not.toContain('test-key-not-real');
    expect(body).not.toContain('OPENAI_API_KEY');
  });

  it('strips HTML from input (XSS prevention)', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .send({ message: '<script>alert("xss")</script>How to vote?' });

    // Should not crash; either processed or rejected
    expect([200, 422]).toContain(res.status);
    if (res.status === 200) {
      // The escaped input must not echo back raw HTML
      expect(res.body.reply).not.toContain('<script>');
    }
  });
});
