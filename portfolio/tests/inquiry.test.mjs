import test from 'node:test';
import assert from 'node:assert/strict';
import { createInquiryHandler, validateInquiry } from '../lib/inquiry.mjs';

const body = { name: 'Preview Test', email: 'test@example.com', storeUrl: '', description: 'TEST INQUIRY — no client work requested.', website: '', token: 'test-token' };
const env = { POSTMARK_SERVER_TOKEN: 'fake-token', POSTMARK_FROM_EMAIL: 'sender@example.com', TURNSTILE_SECRET_KEY: 'fake-secret' };
const origin = 'https://febbygunawan.com';
const verification = { success: true, action: 'inquiry', hostname: 'febbygunawan.com' };
const accepted = { ErrorCode: 0, MessageID: 'test-id' };

async function invoke({ data = body, headers = {}, method = 'POST', config = env, responses = [verification, accepted], failAt } = {}) {
  const calls = [];
  const handler = createInquiryHandler({ env: config, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    if (calls.length === failAt) throw new Error('Provider unavailable');
    return { ok: true, json: async () => responses[calls.length - 1] };
  } });
  const response = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.code = value; return this; }, json(value) { this.body = value; return this; } };
  await handler({ method, headers: { origin, 'content-type': 'application/json', ...headers }, body: data }, response);
  return { response, calls };
}

test('accepts only after verification and Postmark acceptance; fixed recipient and safe reply-to', async () => {
  const { response, calls } = await invoke();
  assert.equal(response.code, 200);
  assert.equal(response.body.ok, true);
  assert.equal(response.headers['Cache-Control'], 'no-store');
  const email = JSON.parse(calls[1].options.body);
  assert.equal(email.To, 'me@febbygunawan.com');
  assert.equal(email.ReplyTo, body.email);
  assert.equal(email.From, env.POSTMARK_FROM_EMAIL);
  assert.equal(email.TrackOpens, false);
  assert.equal(email.HtmlBody, undefined);
});

test('validates required fields, types, lengths, header injection, and optional HTTP store URLs', () => {
  assert.deepEqual(validateInquiry(body).errors, {});
  for (const data of [
    { name: '' }, { name: 'a'.repeat(101) }, { name: 'Alice\nBcc: x@y.com' },
    { email: 'invalid' }, { email: 'x@y.com\nBcc: x@y.com' }, { email: 'a'.repeat(255) },
    { description: 'short' }, { description: 'a'.repeat(5001) }, { description: {} },
    { storeUrl: 'javascript:alert(1)' }, { storeUrl: 'https://user:password@shop.test' }, { storeUrl: 'https://shop.test/' + 'a'.repeat(2048) },
  ]) assert.ok(Object.keys(validateInquiry({ ...body, ...data }).errors).length, JSON.stringify(data).slice(0, 100));
  assert.deepEqual(validateInquiry({ ...body, storeUrl: 'https://shop.example/products/test' }).errors, {});
});

test('rejects invalid requests before calling external providers', async () => {
  for (const [options, code] of [
    [{ method: 'GET' }, 405], [{ headers: { origin: 'https://attacker.example' } }, 403],
    [{ headers: { 'content-type': 'text/plain' } }, 415], [{ data: [] }, 400],
    [{ data: { ...body, website: 'spam' } }, 400], [{ data: { ...body, name: '' } }, 422],
    [{ data: { ...body, description: 'a'.repeat(33000) } }, 413],
    [{ data: { ...body, token: '' } }, 422], [{ config: {} }, 503],
  ]) {
    const { response, calls } = await invoke(options);
    assert.equal(response.code, code);
    assert.equal(response.body.ok, false);
    assert.equal(calls.length, 0);
  }
});

test('fails closed on expired/replayed tokens, wrong hostname/action, and verification outage', async () => {
  for (const result of [{ success: false, 'error-codes': ['timeout-or-duplicate'] }, { ...verification, action: 'other' }, { ...verification, hostname: 'attacker.example' }]) {
    const { response, calls } = await invoke({ responses: [result] });
    assert.equal(response.code, 403);
    assert.equal(calls.length, 1);
  }
  assert.equal((await invoke({ failAt: 1 })).response.code, 503);
});

test('accepts explicitly configured preview origins without trusting arbitrary hosts', async () => {
  const host = 'portfolio-preview.vercel.app';
  const { response } = await invoke({ config: { ...env, VERCEL_URL: host }, headers: { origin: `https://${host}` }, responses: [{ ...verification, hostname: host }, accepted] });
  assert.equal(response.code, 200);
});

test('does not claim success or retry when Postmark rejects or times out', async () => {
  for (const options of [{ responses: [verification, { ErrorCode: 422, Message: 'Invalid sender' }] }, { responses: [verification, { ErrorCode: 0 }] }, { failAt: 2 }]) {
    const { response, calls } = await invoke(options);
    assert.equal(response.code, 502);
    assert.equal(response.body.ok, false);
    assert.equal(calls.length, 2);
    assert.ok(!response.body.message.includes('Invalid sender'));
  }
});
