# Quick Facts Blog

A modern, SEO-optimized blog platform for sharing bite-sized insights across science, technology, nature, history, health, and space.

## 🚀 Features

- **Next.js 15 App Router** with TypeScript
- **Express.js Backend** with Supabase database
- **Cloudinary Integration** for image uploads
- **Scheduled Post Publishing** with background workers
- **Google AdSense Integration** (header, sidebar, inline ads)
- **SEO Optimized** with metadata and Open Graph tags
- **Fully Responsive** design (mobile-first with Tailwind CSS)
- **Green Brand Theme** with custom color palette
- **Hybrid Next Post Logic** (70% same category, 30% random)

## 📁 Project Structure

```
Blog/
├── backend/              # Express.js API server
│   ├── db/              # Database schema
│   ├── jobs/            # Scheduled post worker
│   ├── lib/             # Supabase & Cloudinary clients
│   ├── middleware/      # Error handler
│   ├── routes/          # API endpoints
│   ├── tests/           # Automated tests
│   ├── utils/           # Helper functions
│   ├── .env             # Backend environment variables
│   └── server.js        # Express server entry
│
├── frontend/            # Next.js 15 application
│   ├── src/
│   │   ├── app/        # App Router pages
│   │   ├── components/ # React components
│   │   └── lib/        # API client, helpers, types
│   ├── .env.local      # Frontend environment variables
│   └── tailwind.config.js
│
└── scripts/            # Utility scripts (env verification)
```

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- Supabase (PostgreSQL)
- Cloudinary (image hosting)
- Node test runner

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- Axios

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Cloudinary account
- Google AdSense account (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env`:
```env
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_preset
```

4. Create Supabase tables (run in Supabase SQL editor):
```sql
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
```

5. Start development server:
```bash
npm run dev
```

Backend runs on http://localhost:4000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

4. Start development server:
```bash
npm run dev
```

Frontend runs on http://localhost:3000

## 🧪 Testing

Run backend tests:
```bash
cd backend
npm test
```

All routes are covered with automated tests.

## 🎨 Design

- **Color Scheme**: Green brand theme with natural tones
- **Typography**: Inter (sans) + Playfair Display (headings)
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 📊 API Endpoints

### Posts
- `POST /api/posts` - Create a post
- `GET /api/posts` - List posts (with filters: `?category=X&status=published`)
- `GET /api/posts/:id` - Get single post
- `GET /api/posts/category/:category` - Get posts by category

### Uploads
- `POST /api/uploads/image` - Upload image to Cloudinary

## 🔄 Scheduled Posts

Posts with `scheduled_at` in the future remain unpublished until the scheduled time. A background worker checks every minute and publishes due posts automatically.

## 📈 SEO Features

- Dynamic metadata for all pages
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Optimized images with Next.js Image component
- Sitemap ready (add sitemap.xml generation for production)

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy

Update `NEXT_PUBLIC_API_BASE_URL` to your production backend URL.

## 📝 Usage

### Creating a Post
1. Visit `/admin`
2. Fill in title, description, category
3. Upload an image (optional)
4. Set schedule date/time (optional)
5. Click "Publish Post"

### Viewing Posts
- Homepage: Shows all published posts
- Post detail: Click any post card
- Categories: Filter by category in sidebar

## 🤝 Contributing

This is a client project. For modifications, contact the project owner.

## 📄 License

Proprietary - All rights reserved

## 🔧 Environment Variables Reference

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 4000) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset |

### Frontend (.env.local)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Upload preset name |

---

Built with ❤️ for sharing knowledge
