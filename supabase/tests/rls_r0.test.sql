-- RLS tests for R0 (TASKS T3.5). Run with `supabase test db` (pgTAP).
begin;
select plan(5);

set local role anon;

select ok((select count(*) from public.brands) > 0, 'anon can read active brands');
select ok((select count(*) from public.categories) > 0, 'anon can read active categories');
select is((select count(*) from public.enquiries), 0::bigint, 'anon cannot read enquiries');
select is((select count(*) from public.newsletter_subscribers), 0::bigint, 'anon cannot read subscribers');
select throws_ok(
  $$ insert into public.enquiries (type, name, mobile, message, consent_at)
     values ('contact', 'Test', '9876543210', 'hello there', now()) $$,
  '42501',
  null,
  'anon cannot insert enquiries directly'
);

select * from finish();
rollback;
