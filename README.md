# Employee Directory API

A small REST API for managing employees, built as a learning project for Express.js. It's a plain CRUD backend — no authentication — structured the way a real-world Express app is usually laid out: routes → validators → controllers → services → database.

## Tech stack

- **Express 4** + **TypeScript**
- **PostgreSQL** via **Prisma ORM**
- **express-validator** for request validation
- **cors**, **morgan**, **dotenv** for the standard backend plumbing

## Prerequisites

- Node.js 18+
- A running PostgreSQL server (locally installed, or via Docker: `docker run --name employee-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy the env template and fill in your own database credentials:
   ```
   cp .env.example .env
   ```
   Edit `DATABASE_URL` in `.env` to point at your Postgres instance, e.g.:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/employee_directory"
   ```
3. Create the database table (and the `EmployeeStatus` enum) from the Prisma schema:
   ```
   npm run prisma:migrate
   ```
   This will prompt you to name the migration (e.g. `init`) the first time.
4. (Optional but recommended) Load 7 sample employees so there's data to look at right away:
   ```
   npm run prisma:seed
   ```
5. Start the dev server (auto-restarts on file changes):
   ```
   npm run dev
   ```
6. Confirm it's running by visiting **http://localhost:4000/health** in your browser — you should see a JSON response with `"success": true`.

### Browsing the database visually

Run `npm run prisma:studio` to open **Prisma Studio**, a browser GUI (at http://localhost:5555) where you can view and edit rows without writing any SQL. Great for sanity-checking that your CRUD requests actually changed the data.

## API reference

All responses are JSON. Successful responses look like:
```json
{ "success": true, "message": "...", "data": { ... } }
```
Errors look like:
```json
{ "success": false, "message": "...", "errors": [] }
```

| Method | Path | Body | Description |
|---|---|---|---|
| GET | `/health` | — | Liveness check |
| GET | `/api/employees` | — | List all employees. Supports `?search=` (matches name/designation/skill) and `?status=ACTIVE\|ON_LEAVE\|INACTIVE` query params |
| GET | `/api/employees/:id` | — | Get one employee by id |
| POST | `/api/employees` | `{ name, designation, skills[], status? }` | Create an employee |
| PUT | `/api/employees/:id` | any subset of `{ name, designation, skills[], status }` | Update an employee |
| DELETE | `/api/employees/:id` | — | Delete an employee |

### curl examples

```bash
curl http://localhost:4000/api/employees

curl -X POST http://localhost:4000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","designation":"Intern","skills":["JavaScript"]}'

curl -X PUT http://localhost:4000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"ON_LEAVE"}'

curl -X DELETE http://localhost:4000/api/employees/1
```

### Manual testing without curl

Open [`requests.http`](requests.http) in VS Code with the **REST Client** extension installed — every endpoint above (plus a validation-error and a 404 example) is ready to click and run.

## Project structure

```
prisma/
  schema.prisma     Employee model + EmployeeStatus enum
  seed.ts           Loads 7 sample employees
src/
  server.ts         Entry point — starts the HTTP server
  app.ts            Builds the Express app and middleware pipeline
  config/           Env loading (env.ts) and the shared Prisma client (db.ts)
  routes/           Maps URLs to validators + controllers
  controllers/      Reads the request, calls a service, shapes the response
  services/         Business logic and all database queries
  validators/       express-validator rules for request bodies
  middleware/       notFound (404), errorHandler (centralized errors), validateRequest
  types/            Shared TypeScript interfaces for request bodies
  utils/            ApiResponse, ApiError, asyncHandler, formatEmployeeCode
```

## Design notes

- **Prisma over Sequelize** — Prisma's `schema.prisma` gives a single, readable source of truth for the data shape, plus a fully typed query client and Prisma Studio for visually inspecting data — helpful when you're still building a mental model of what's in the database.
- **express-validator over zod** — it attaches to a route as a plain array of middleware, which fits Express's own request-pipeline model rather than introducing a separate validation-schema concept.
- **No `employeeCode` column** — the `CDT-1042`-style display code is computed from the numeric `id` on the way out (`formatEmployeeCode`), not stored, so there's no risk of it going out of sync and no extra migration complexity.
- **Search is a simple `contains`/`hasSome` match** — good enough for the seeded demo data. A case-insensitive substring match *inside* the `skills` array would need a raw SQL query (Prisma's array filters only do exact-value matches), which is left as a "going further" exercise.
