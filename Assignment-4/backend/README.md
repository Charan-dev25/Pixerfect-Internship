# Blog API (Node.js + Express + MongoDB)

Simple REST API for Users and Blog Posts with optional JWT auth and pagination.

## Setup

1. Copy `.env.example` to `.env` and adjust values:

```
cp .env.example .env
```

2. Install dependencies:

```
npm install
```

3. Start server (default http://localhost:5000):

```
npm run dev
```

### Health

```
curl http://localhost:5000/api/health
```

## Users

- Register:
```
curl -X POST http://localhost:5000/api/users/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

- Login:
```
curl -X POST http://localhost:5000/api/users/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

- List (practice):
```
curl http://localhost:5000/api/users
```

## Posts

- Create (requires Bearer token):
```
TOKEN="<paste token>"
USER_ID="<author id>"
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"title\":\"My Post\",\"content\":\"Hello\",\"author\":\"$USER_ID\"}"
```

- List with pagination:
```
curl 'http://localhost:5000/api/posts?page=1&limit=10'
```

- By user:
```
curl http://localhost:5000/api/posts/user/$USER_ID
```

- Get by id:
```
POST_ID="<post id>"
curl http://localhost:5000/api/posts/$POST_ID
```

- Update (requires Bearer token):
```
curl -X PUT http://localhost:5000/api/posts/$POST_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"title":"Updated","content":"New content"}'
```

- Delete (requires Bearer token):
```
curl -X DELETE http://localhost:5000/api/posts/$POST_ID \
  -H "Authorization: Bearer $TOKEN"
```

## Project Structure

- `src/config/db.js` - Mongo connection
- `src/models/` - Mongoose models
- `src/controllers/` - Request handlers
- `src/routes/` - Express routers
- `src/middleware/` - Auth and error handlers
- `src/app.js` - Express app
- `src/server.js` - Server bootstrap
