-- Quick Facts Supabase schema
create extension if not exists "uuid-ossp";

create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text,
  category text references categories(name),
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists posts_category_idx on posts(category);
create index if not exists posts_scheduled_at_idx on posts(scheduled_at);
