# AI Business IQ

Responsive MVP for an AI readiness quiz, IQ dashboard, improvement roadmap, and simple admin export.

## Run

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` to enable Supabase saving, admin reads, and Google Sheets submissions.

Set `GOOGLE_SHEETS_WEBHOOK_URL` to a deployed Google Apps Script web app URL. The app posts the user's name, email address, score, profile, category scores, recommended project, roadmap text, and every question/answer label to that webhook.

Example Apps Script for the target sheet:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById("1AxazrmsI22KouKgpNITJTFcW9GMp8YD2LlT9G7YSz7M").getSheets()[0];
  const answers = data.answers.reduce((row, item) => {
    row[item.id] = item.answer;
    return row;
  }, {});

  sheet.appendRow([
    data.submittedAt,
    data.name,
    data.email,
    data.overallScore,
    data.profile,
    data.recommendedProject,
    answers.q1,
    answers.q2,
    answers.q3,
    answers.q4,
    answers.q5,
    answers.q6,
    answers.q7,
    answers.q8,
    answers.q9,
    answers.q10,
    answers.q11,
    answers.q12,
    answers.q13,
    answers.q14,
    answers.q15,
    answers.q16,
    answers.q17,
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

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
