-- Keep ISR + sitemap caches in sync even when content is edited outside /admin.
-- This trigger posts row-change payloads to Next.js `/api/revalidate/db-webhook`.
--
-- Required Vault secrets (set once in Supabase SQL editor):
--   select vault.create_secret('cms_revalidate_webhook_secret', '<same-as-CMS_REVALIDATE_WEBHOOK_SECRET>');
--   select vault.create_secret('site_base_url', 'https://qapilot.io');
--
-- If `site_base_url` is missing, defaults to https://qapilot.io.

create extension if not exists pg_net with schema extensions;
create extension if not exists supabase_vault with schema vault;

create or replace function public.cms_revalidate_webhook_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_secret text;
  site_base_url text;
  webhook_url text;
  payload jsonb;
begin
  select decrypted_secret
  into webhook_secret
  from vault.decrypted_secrets
  where name = 'cms_revalidate_webhook_secret'
  limit 1;

  if webhook_secret is null or length(trim(webhook_secret)) = 0 then
    raise warning '[cms_revalidate_webhook_trigger] Missing vault secret: cms_revalidate_webhook_secret';
    return coalesce(new, old);
  end if;

  select decrypted_secret
  into site_base_url
  from vault.decrypted_secrets
  where name = 'site_base_url'
  limit 1;

  if site_base_url is null or length(trim(site_base_url)) = 0 then
    site_base_url := 'https://qapilot.io';
  end if;

  site_base_url := rtrim(site_base_url, '/');
  webhook_url := site_base_url || '/api/revalidate/db-webhook';

  payload := jsonb_build_object(
    'type', tg_op,
    'table', tg_table_name,
    'schema', tg_table_schema,
    'record', case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end,
    'old_record', case when tg_op = 'INSERT' then null else to_jsonb(old) end
  );

  perform net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cms-webhook-secret', webhook_secret
    ),
    body := payload
  );

  return coalesce(new, old);
exception
  when others then
    raise warning '[cms_revalidate_webhook_trigger] %', sqlerrm;
    return coalesce(new, old);
end;
$$;

drop trigger if exists cms_revalidate_blogs on public.blogs;
create trigger cms_revalidate_blogs
after insert or update or delete on public.blogs
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_news_updates on public.news_updates;
create trigger cms_revalidate_news_updates
after insert or update or delete on public.news_updates
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_case_studies on public.case_studies;
create trigger cms_revalidate_case_studies
after insert or update or delete on public.case_studies
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_job_openings on public.job_openings;
create trigger cms_revalidate_job_openings
after insert or update or delete on public.job_openings
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_job_organizations on public.job_organizations;
create trigger cms_revalidate_job_organizations
after insert or update or delete on public.job_organizations
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_faqs on public.faqs;
create trigger cms_revalidate_faqs
after insert or update or delete on public.faqs
for each row
execute function public.cms_revalidate_webhook_trigger();

drop trigger if exists cms_revalidate_terms_content on public.terms_content;
create trigger cms_revalidate_terms_content
after insert or update or delete on public.terms_content
for each row
execute function public.cms_revalidate_webhook_trigger();
