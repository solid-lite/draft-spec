# Solid Lite Examples

Ready-to-run example servers and client.

## Quick Start

```bash
npm install
npm start
```

Server runs at http://localhost:3000

## Examples

### minimal-server.js
The simplest Solid Lite server. ~50 lines.
- **SLIPs:** 10 (HTTP), 11 (CORS), 12 (JSON-LD)
- **Auth:** None (public read/write)

```bash
npm run minimal
```

### personal-server.js
Single-user server with authentication.
- **SLIPs:** 10, 11, 12, 40 (Containers), 81 (Bearer), 90 (Owner Write)
- **Auth:** Bearer token

```bash
SOLID_API_KEY=mysecret npm run personal
```

### client.html
Browser-based notes app. Open in browser, connect to server.

## Test with curl

```bash
# Create a note
curl -X PUT http://localhost:3000/notes/1.json \
  -H "Content-Type: application/ld+json" \
  -d '{"@type": "Note", "text": "Hello Solid!"}'

# Read it
curl http://localhost:3000/notes/1.json

# List container
curl http://localhost:3000/notes/

# Delete
curl -X DELETE http://localhost:3000/notes/1.json
```

## Next Steps

- Add more SLIPs from https://solid-lite.github.io/slips/
- Try the full JSS server: https://github.com/JavaScriptSolidServer/JavaScriptSolidServer
