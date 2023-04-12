# Next.js app template

## Deploy new repo

1. Create new repo from [this template project](https://github.com/Frezzle/template-nextjs); "use this template" -> "create new repo".
2. Deploy to vercel by linking to new repo.
3. Set Vercel serverless funcs to same region as DB (or close). Railway only has US-West region right now, so make it sfo1 (san francisco); this should be [configured already](./vercel.json).

## Set up DB

Initial setup:

1. Create postgres DB in https://railway.app.
2. Set `DATABASE_URL` in `.env` and set file to only be readable/writeable by me `chmod 600 .env`.
3. Delete `prisma/migrations` folder, I think (temporarily move if unsure).
4. Edit DB schema to what you want: `prisma/schema.prisma`.
5. Apply your schema to DB: `pnpx prisma migrate dev --name init`.
6. Set `DATABASE_URL` env var in Vercel project.

Every time you change the DB schema:

- Generate/apply a new migration: `pnpx prisma migrate dev --name MIGRATION_NAME`. This also re-generates the prisma client.
  - TODO: for safety, find a way to generate the migration separately from applying it, so I can manually check the generated commands.
- If you need to re-generate the prisma client without migrating: `pnpx prisma generate`.

## Set up repo

When cloning this repo, set up a local `.env` file:

```bash
DATABASE_URL='get this from railway.app'
```

## Set up IDE

Install VS Codium ideally.

Install extensions of technologies that this repo uses:

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
