-- Remove the policy that allows users to see their own roles (prevents enumeration)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Add admin-only SELECT policy for managing roles
CREATE POLICY "Only admins can view roles" 
ON public.user_roles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));