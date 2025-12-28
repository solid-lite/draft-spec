/**
 * Minimal Solid Lite Server
 * Implements: SLIP-10 (HTTP), SLIP-11 (CORS), SLIP-12 (JSON-LD)
 *
 * Run: node minimal-server.js
 * Test: curl -X PUT http://localhost:3000/hello.txt -d "Hello!"
 */

import Fastify from 'fastify';
import fs from 'fs/promises';
import path from 'path';

const app = Fastify({ logger: true });
const DATA_DIR = './data';

// Ensure data directory exists
await fs.mkdir(DATA_DIR, { recursive: true });

// CORS headers (SLIP-11)
app.addHook('onSend', (req, reply, payload, done) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  reply.header('Access-Control-Expose-Headers', 'Location, Link');
  done();
});

// OPTIONS for CORS preflight
app.options('*', (req, reply) => reply.send());

// GET - Read resource (SLIP-10)
app.get('/*', async (req, reply) => {
  const filePath = path.join(DATA_DIR, req.url);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const ext = path.extname(filePath);
    const contentType = ext === '.json' || ext === '.jsonld'
      ? 'application/ld+json'
      : 'text/plain';
    return reply.type(contentType).send(content);
  } catch (e) {
    return reply.code(404).send({ error: 'Not Found' });
  }
});

// PUT - Create/Update resource (SLIP-10)
app.put('/*', async (req, reply) => {
  const filePath = path.join(DATA_DIR, req.url);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, req.body);
  return reply.code(201).header('Location', req.url).send({ created: req.url });
});

// DELETE - Remove resource (SLIP-10)
app.delete('/*', async (req, reply) => {
  const filePath = path.join(DATA_DIR, req.url);
  try {
    await fs.unlink(filePath);
    return reply.code(204).send();
  } catch (e) {
    return reply.code(404).send({ error: 'Not Found' });
  }
});

// Start server
app.listen({ port: 3000, host: '0.0.0.0' }, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  Solid Lite Server (Minimal)                  ║
║  http://localhost:3000                        ║
║                                               ║
║  SLIPs: 10 (HTTP), 11 (CORS), 12 (JSON-LD)   ║
╚═══════════════════════════════════════════════╝
  `);
});
