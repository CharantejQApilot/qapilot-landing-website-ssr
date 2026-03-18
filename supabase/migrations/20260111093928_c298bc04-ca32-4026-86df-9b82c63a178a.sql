-- Fix storage policy conflict by removing overly permissive policies
-- Keep only admin-only access to blog-images bucket

DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for blog images" ON storage.objects;