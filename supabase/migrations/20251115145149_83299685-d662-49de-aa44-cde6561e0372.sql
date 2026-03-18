-- Fix search_path for ensure_single_banner function
CREATE OR REPLACE FUNCTION public.ensure_single_banner()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_banner = true THEN
    -- Unset any other banners
    UPDATE public.news_updates
    SET is_banner = false
    WHERE is_banner = true AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;