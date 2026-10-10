const recipient = 'me@febbygunawan.com';
const emailPattern = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
const limits = { name: 100, email: 254, storeUrl: 2048, description: 5000 };

export function validateInquiry(body) {
  const errors = {};
  const values = {};
  for (const [key, max] of Object.entries(limits)) {
    const raw = body[key];
    const value = typeof raw === 'string' ? raw.trim() : '';
    values[key] = value;
    if (typeof raw !== 'string' && !(key === 'storeUrl' && raw === undefined)) errors[key] = 'Enter a valid text value.';
    else if (key !== 'storeUrl' && !value) errors[key] = 'This field is required.';
    else if (value.length > max) errors[key] = `Use no more than ${max} characters.`;
    else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) errors[key] = 'Remove unsupported control characters.';
  }
  if (values.name && /[\r\n]/.test(values.name)) errors.name = 'Enter your name on one line.';
  if (values.email && !emailPattern.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.description && values.description.length < 10) errors.description = 'Please use at least 10 characters to describe the issue.';
  if (values.storeUrl) {
    try {
      const url = new URL(values.storeUrl);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || /\s/.test(values.storeUrl)) throw new Error();
    } catch { errors.storeUrl = 'Use a complete http:// or https:// store URL without credentials.'; }
  }
  return { errors, values };
}

export function createInquiryHandler({ env = process.env, fetchImpl = globalThis.fetch } = {}) {
  return async function inquiry(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Robots-Tag', 'noindex');
    const reply = (status, message, extra = {}) => response.status(status).json({ ok: status === 200, message, ...extra });
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return reply(405, 'Use POST to send an inquiry.');
    }
    const origins = new Set(['https://febbygunawan.com', ...(env.INQUIRY_ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean)]);
    if (env.VERCEL_URL) origins.add(`https://${env.VERCEL_URL}`);
    const origin = request.headers.origin;
    if (typeof origin !== 'string' || !origins.has(origin)) return reply(403, 'This origin is not allowed to submit inquiries.');
    if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply(415, 'Send the form as JSON.');
    const body = request.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, 'Invalid form data.');
    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > 32768) return reply(413, 'The inquiry is too large. Please shorten it.');
    if (body.website !== undefined && body.website !== '') return reply(400, 'The inquiry could not be accepted. Please email me instead.');
    const { errors, values } = validateInquiry(body);
    if (Object.keys(errors).length) return reply(422, 'Please correct the marked fields.', { errors });
    if (!env.POSTMARK_SERVER_TOKEN || !env.POSTMARK_FROM_EMAIL || !emailPattern.test(env.POSTMARK_FROM_EMAIL) || !env.TURNSTILE_SECRET_KEY) {
      return reply(503, 'The inquiry form is not configured yet. Please email me@febbygunawan.com.');
    }
    if (typeof body.token !== 'string' || !body.token || body.token.length > 2048) return reply(422, 'Please complete spam verification and try again.');

    try {
      const verificationResponse = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.token }),
        signal: AbortSignal.timeout(8000),
      });
      const verification = await verificationResponse.json();
      if (!verificationResponse.ok || verification.success !== true || verification.action !== 'inquiry' || verification.hostname !== new URL(origin).hostname) {
        return reply(403, 'Spam verification failed or expired. Please complete it again.');
      }
    } catch {
      return reply(503, 'Spam verification is temporarily unavailable. Please try again or email me.');
    }

    try {
      const delivery = await fetchImpl('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Postmark-Server-Token': env.POSTMARK_SERVER_TOKEN,
        },
        body: JSON.stringify({
          From: env.POSTMARK_FROM_EMAIL,
          To: recipient,
          ReplyTo: values.email,
          Subject: 'Portfolio inquiry',
          TextBody: `Name: ${values.name}\nEmail: ${values.email}\nStore URL: ${values.storeUrl || '(not provided)'}\n\nIssue or project description:\n${values.description}`,
          MessageStream: env.POSTMARK_MESSAGE_STREAM || 'outbound',
          TrackOpens: false,
          TrackLinks: 'None',
        }),
        signal: AbortSignal.timeout(12000),
      });
      const result = await delivery.json();
      if (!delivery.ok || result.ErrorCode !== 0 || typeof result.MessageID !== 'string' || !result.MessageID) {
        return reply(502, 'Email delivery was not accepted. Your entries are preserved; please try again or email me.');
      }
      return reply(200, 'Your inquiry was accepted for email delivery.');
    } catch {
      return reply(502, 'Delivery could not be confirmed. Please email me before retrying to avoid sending a duplicate.');
    }
  };
}
