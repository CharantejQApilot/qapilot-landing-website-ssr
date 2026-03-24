-- Let authenticated users read only their own user_roles row.
-- Needed for /admin gate (AdminClient queries .eq("user_id", session.user.id)).
-- Without this, SELECT policies that only allow rows via has_role(..., 'admin')
-- can deadlock with has_role() internals on some Postgres/RLS setups after migration.

CREATE POLICY "Authenticated users can select own user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id::uuid);
