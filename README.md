# Next.js app template

## DB setup

Initial setup:

1. Create postgres DB in https://railway.app.
2. Set `DATABASE_URL` in `.env`.
3. Delete `prisma/migrations` folder, I think (temporarily move if unsure).
4. Edit DB schema to what you want: `prisma/schema.prisma`.
5. Apply your schema to DB: `pnpx prisma migrate dev --name init`.
6. Set `DATABASE_URL` env var in Vercel project.

Every time you change the DB schema:

- Generate/apply a new migration: `pnpx prisma migrate dev --name MIGRATION_NAME`. This also re-generates the prisma client.
- If you need to re-generate the prisma client without migrating: `pnpx prisma generate`.
