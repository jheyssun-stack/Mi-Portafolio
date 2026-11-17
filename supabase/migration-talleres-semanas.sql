-- Ejecuta una sola vez en Supabase > SQL Editor.
-- Conserva los archivos antiguos (taller-1 / taller-2) y permite nuevos archivos
-- en Taller I semanas 1-8 y Taller II semanas 9-18.
alter table public.portfolio_items drop constraint if exists valid_course_section;

alter table public.portfolio_items add constraint valid_course_section check (
  (course = 'algoritmos' and section ~ '^week-(0[1-9]|1[0-6])$') or
  (course = 'apps' and (
    section in ('taller-1','taller-2') or
    section ~ '^taller-1-week-0[1-8]$' or
    section ~ '^taller-2-week-(0[9]|1[0-8])$'
  ))
);
