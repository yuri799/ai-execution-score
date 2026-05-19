# AI Execution Score

Responsive MVP for an AI readiness quiz, score dashboard, course roadmap, course PDF, and simple admin export.

## Run

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` to enable Supabase saving and admin reads.

The quiz no longer collects email. If your existing `users.email` column is still required, the app writes an automatic `not-collected` placeholder so submissions still save.

## Supabase Tables

```sql
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  created_at timestamptz not null default now()
);

create table public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  answers jsonb not null,
  ai_basics_score numeric not null,
  prompting_score numeric not null,
  verification_score numeric not null,
  business_strategy_score numeric not null,
  automation_tools_score numeric not null,
  team_privacy_score numeric not null,
  overall_score numeric not null,
  profile text not null,
  recommended_modules jsonb not null,
  skipped_modules jsonb not null,
  recommended_project jsonb not null,
  generated_roadmap text not null,
  created_at timestamptz not null default now()
);
```
