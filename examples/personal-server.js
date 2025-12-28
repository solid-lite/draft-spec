/**
 * Personal Solid Lite Server (Single User)
 * Implements: SLIP-10, 11, 12, 40 (Containers), 81 (Bearer Auth), 90 (Owner Write)
 *
 * Run: SOLID_API_KEY=mysecret node personal-server.js
 * Test: curl -X PUT http://localhost:3000/notes/1.json \
 *         -H "Authorization: Bearer mysecret" \
 *         -H "Content-Type: application/ld+json" \
 *         -d '{"@type": "Note", "text": "Hello!"}'
 */

import Fastify from 'fastify';
import fs from 'fs/promises';
import path from 'path';

const app = Fastify({ logger: true });
const DATA_DIR = './data';
const API_KEY = process.env.SOLID_API_KEY || 'secret';

await fs.mkdir(DATA_DIR, { recursive: true });

// CORS headers (SLIP-11)
app.addHook('onSend', (req, reply, payload, done) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, DELETE, POST, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Access-Control-Expose-Headers', 'Location, Link, WAC-Allow');
  done();
});

// Authentication check (SLIP-81, SLIP-90)
app.addHook('preHandler', (req, reply, done) => {
  // Public reads allowed (SLIP-90: everyone reads)
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    reply.header('WAC-Allow', 'user="read write", public="read"');
    return done();
  }

  // Writes require auth (SLIP-90: owner writes)
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${API_KEY}`) {
    reply.header('WWW-Authenticate', 'Bearer');
    return reply.code(401).send({ error: 'Unauthorized' });
  }

  reply.header('WAC-Allow', 'user="read write", public="read"');
  done();
});

app.options('*', (req, reply) => reply.send());

// Helper: Check if path is a container
const isContainer = (urlPath) => urlPath.endsWith('/');

// GET container - list contents (SLIP-40)
app.get('/*/', async (req, reply) => {
  const dirPath = path.join(DATA_DIR, req.url);
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const contains = files.map(f => ({
      '@id': f.name + (f.isDirectory() ? '/' : '')
    }));

    reply.header('Link', '<http://www.w3.org/ns/ldp#Container>; rel="type"');
    return reply.type('application/ld+json').send({
      '@context': 'http://www.w3.org/ns/ldp#',
      '@id': req.url,
      '@type': ['Container', 'BasicContainer'],
      'contains': contains
    });
  } catch (e) {
    return reply.code(404).send({ error: 'Not Found' });
  }
});

// GET resource
app.get('/*', async (req, reply) => {
  if (isContainer(req.url)) return; // Handled above

  const filePath = path.join(DATA_DIR, req.url);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    reply.header('Link', '<http://www.w3.org/ns/ldp#Resource>; rel="type"');
    return reply.type('application/ld+json').send(content);
  } catch (e) {
    return reply.code(404).send({ error: 'Not Found' });
  }
});

// PUT resource
app.put('/*', async (req, reply) => {
  const filePath = path.join(DATA_DIR, req.url);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, typeof req.body === 'string' ? req.body : JSON.stringify(req.body));
  return reply.code(201).header('Location', req.url).send({ created: req.url });
});

// POST to container (SLIP-40)
app.post('/*/', async (req, reply) => {
  const slug = req.headers.slug || `${Date.now()}`;
  const filePath = path.join(DATA_DIR, req.url, slug + '.jsonld');
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, typeof req.body === 'string' ? req.body : JSON.stringify(req.body));
  const location = path.join(req.url, slug + '.jsonld');
  return reply.code(201).header('Location', location).send({ created: location });
});

// DELETE resource
app.delete('/*', async (req, reply) => {
  const filePath = path.join(DATA_DIR, req.url);
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await fs.rm(filePath, { recursive: true });
    } else {
      await fs.unlink(filePath);
    }
    return reply.code(204).send();
  } catch (e) {
    return reply.code(404).send({ error: 'Not Found' });
  }
});

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  Solid Lite Server (Personal)                 ║
║  http://localhost:3000                        ║
║                                               ║
║  API Key: ${API_KEY.substring(0, 4)}...                              ║
║  SLIPs: 10, 11, 12, 40, 81, 90                ║
╚═══════════════════════════════════════════════╝
  `);
});
