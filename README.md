# Chanor Dashboard

Chanor Dashboard is a Next.js admin app.

It supports supervisor analytics, customer review, disputes, support, wallets, and security views.

## Requirements

- Use Node.js 24 or later.
- Use npm for package management.
- Configure Clerk and backend API variables in a local env file.

## Setup

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env.local
```

Set the required values in `.env.local`.

## Custom Port

The app uses `PORT` to set the Next.js port.

If `PORT` is not set, the app uses `3000`.

Set a custom port in `.env.local`:

```bash
PORT=3001
```

Start the dev server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3001
```

You can also set `PORT` from your shell.

PowerShell:

```powershell
$env:PORT=3001
npm run dev
```

Bash:

```bash
PORT=3001 npm run dev
```

The same `PORT` setting also applies to:

```bash
npm run start
```

## Scripts

- `npm run dev` starts Next.js in development mode.
- `npm run build` creates a production build.
- `npm run start` starts the production server.
- `npm run lint` runs ESLint.

## Branch Workflow

Use `main` for production-ready code.

Use `dev` for shared integration work.

Update `dev` only through pull requests.

Create personal workspace branches for feature work.

Use this branch format:

```text
pws/<name>
```

Example:

```text
pws/john
```

Here, `pws` means personal workspace.

Create your workspace branch from `dev`.

Work in your workspace branch.

Open a pull request into `dev` when the work is ready.
