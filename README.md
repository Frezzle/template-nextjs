# Next.js app template

## Set up IDE

Install VS Codium ideally.

Install extensions of technologies that this repo uses:

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense

## Choose app/service name

How long can I use the free Vercel domain? To not waste time thinking about a name initially or waste money on custom domain (is it a waste? domains are cheap, and the name will be used in so many places that it's convenient to pick early).

## Set up custom domain

Needed for:

- release (ideally)
- passwordless login
- email notifications

FYI: Seems like email always costs extra, so don't worry about it and use Zoho for free if/when setting up email.

Places to buy domain:

- porkbun
- namecheap
- google domains
- netlify/vercel
- zoho
- godaddy

## Set up deployment

1. Create new repo from [this template project](https://github.com/Frezzle/template-nextjs); "use this template" -> "create new repo".
2. Deploy to vercel by linking to new repo.
3. Set Vercel serverless funcs to same region as DB (or close). Railway only has US-West region right now, so make it sfo1 (san francisco); this should be [configured already](./vercel.json).
4. Set up custom domain with HTTPS (can do now or later); change domain to point to Vercel DNS (since Vercel will host the app).
5. Continue to set everything else up in other sections of this doc, which may need more env vars setup in Vercel and redeployments until everything works properly.

**Warning: some domains offer no WHOIS privacy**, i.e. your details are public in whois.com, e.g. `.co.uk` domains. Solutions:

- buy a domain that supports WHOIS privacy (.e.g `.dev`)
- use a virtual office address (from GBP1/week)
- use a fake address (not recommended)
- suck it up and show my real details (not ideal)

## Set up DB

Initial setup:

1. Create postgres DB in https://railway.app.
2. Get connection string and set `DATABASE_URL` in local `.env` and set file to only be readable/writeable by me `chmod 600 .env`.
3. Delete `prisma/migrations` folder, I think (temporarily move if unsure).
4. Edit DB schema to what you want: `prisma/schema.prisma`.
5. Apply your schema to DB: `pnpx prisma migrate dev --name init`.
6. Set `DATABASE_URL` env var in Vercel project.

Every time you change the DB schema:

- Generate/apply a new migration: `pnpx prisma migrate dev --name MIGRATION_NAME`. This also re-generates the prisma client.
  - TODO: for safety, find a way to generate the migration separately from applying it, so I can manually check the generated commands.
- If you need to re-generate the prisma client without migrating: `pnpx prisma generate`.

## Set up email

Prerequisites:

- custom domain

Needed for:

- passwordless login
- email notifications

Made up of these:

- Email server: Zoho provides free email forever plan if you have a custom domain already.
- Email sender: mailjet, register email^ as sender e.g. `noreply@appname.com`.

Setting up:

1. Set up email in Zoho for your custom domain.
2. Register Zoho in vercel DNS. See Zoho for details.
3. Set up this^ email as sender in mailjet.
4. Register mailjet in vercel DNS. See mailjet for details.
5. Wait a day or so, then verify DNS records propagated (within zoho and mailjet).
6. Take mailjet's SMTP public and private key and use as `EMAIL_SERVER` in local `.env` file e.g. `smtp://{publickey}:{privatekey}@{mailjetdomain}:{port}`.
7. Set `EMAIL_FROM` in `.env` as app name and email^.

## Set up auth

1. Choose which next-auth providers you want and configure each one as per next-auth instructions: https://next-auth.js.org/providers

- Each provider will have its own way of registering your app on it for auth.
- Google and passwordless is probably a good default for most apps?
- Any specific extra ones relevant to the types of users you expect e.g. GitHub / Twitter for devs.

2. Make sure to update all env vars in `.env` and Vercel so they point to this app's stuff, not the template project!
