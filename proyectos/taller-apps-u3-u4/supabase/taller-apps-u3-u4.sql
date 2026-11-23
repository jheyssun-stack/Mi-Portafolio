-- JHEYVX Studio · Unidades III y IV
-- Demo SIN inicio de sesión: los datos insertados son públicos.
-- Utiliza solamente registros ficticios. No almacenes información de alumnos/clientes reales.

create table if not exists public.taller_apps_records (
  app_key text not null,
  record_id text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (app_key, record_id)
);

alter table public.taller_apps_records enable row level security;
drop policy if exists "demo public read" on public.taller_apps_records;
drop policy if exists "demo public insert" on public.taller_apps_records;
drop policy if exists "demo public update" on public.taller_apps_records;
drop policy if exists "demo public delete" on public.taller_apps_records;
create policy "demo public read" on public.taller_apps_records for select to anon, authenticated using (true);
create policy "demo public insert" on public.taller_apps_records for insert to anon, authenticated with check (true);
create policy "demo public update" on public.taller_apps_records for update to anon, authenticated using (true) with check (true);
create policy "demo public delete" on public.taller_apps_records for delete to anon, authenticated using (true);
grant select, insert, update, delete on public.taller_apps_records to anon, authenticated;

create unique index if not exists citada_one_confirmed_slot
  on public.taller_apps_records ((payload->>'date'), (payload->>'time'))
  where app_key = 'citada' and payload->>'kind' = 'booking' and payload->>'status' = 'confirmed';

-- Atomic inventory deduction and sale record. Any invalid line rolls back all changes.
create or replace function public.taller_apps_checkout(p_lines jsonb, p_sale_id text)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare line jsonb; product_row public.taller_apps_records%rowtype; qty integer; total_cents bigint := 0; subtotal_cents bigint := 0; discount_cents bigint := 0; sale jsonb;
begin
  if jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) = 0 then raise exception 'La bolsa está vacía.'; end if;
  for line in select value from jsonb_array_elements(p_lines) loop
    qty := (line->>'qty')::integer;
    if qty < 1 then raise exception 'Cantidad inválida.'; end if;
    select * into product_row from public.taller_apps_records where app_key='mercato' and record_id=line->>'id' for update;
    if not found then raise exception 'Producto no encontrado.'; end if;
    if (product_row.payload->>'stock')::integer < qty then raise exception 'Stock insuficiente para %.', product_row.payload->>'name'; end if;
    subtotal_cents := subtotal_cents + round((product_row.payload->>'price')::numeric * 100)::bigint * qty;
    update public.taller_apps_records set payload = jsonb_set(payload, '{stock}', to_jsonb((payload->>'stock')::integer - qty)), updated_at=now()
      where app_key='mercato' and record_id=line->>'id';
  end loop;
  if subtotal_cents >= 50000 then discount_cents := round(subtotal_cents * 0.10); end if;
  total_cents := subtotal_cents - discount_cents;
  sale := jsonb_build_object('id',p_sale_id,'lines',p_lines,'subtotal',subtotal_cents/100.0,'discount',discount_cents/100.0,'total',total_cents/100.0,'createdAt',now());
  insert into public.taller_apps_records(app_key,record_id,payload) values ('mercato-sales',p_sale_id,sale);
  return sale;
end $$;

-- A unique partial index prevents simultaneous clients reserving a single slot twice.
create or replace function public.taller_apps_book_appointment(p_booking jsonb)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare b jsonb;
begin
  b := p_booking || jsonb_build_object('kind','booking','status','confirmed');
  insert into public.taller_apps_records(app_key,record_id,payload) values ('citada',b->>'id',b);
  return b;
exception when unique_violation then raise exception 'Ese horario ya está reservado. Selecciona otro.';
end $$;

create or replace function public.taller_apps_cancel_appointment(p_appointment_id text)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare b jsonb;
begin
  update public.taller_apps_records set payload=jsonb_set(payload,'{status}','"cancelled"'::jsonb), updated_at=now()
    where app_key='citada' and record_id=p_appointment_id and payload->>'kind'='booking' returning payload into b;
  if b is null then raise exception 'No se encontró la cita.'; end if;
  return b;
end $$;

revoke all on function public.taller_apps_checkout(jsonb,text) from public;
revoke all on function public.taller_apps_book_appointment(jsonb) from public;
revoke all on function public.taller_apps_cancel_appointment(text) from public;
grant execute on function public.taller_apps_checkout(jsonb,text) to anon, authenticated;
grant execute on function public.taller_apps_book_appointment(jsonb) to anon, authenticated;
grant execute on function public.taller_apps_cancel_appointment(text) to anon, authenticated;
