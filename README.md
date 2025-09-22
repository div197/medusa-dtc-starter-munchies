# BOB-Medusa E-Commerce Platform

Production-ready Medusa v2.0 e-commerce platform with complete hydration fixes and stabilized codebase.

## Project Status
✅ 90% functionality operational
✅ All hydration issues resolved
✅ Cart functionality working
✅ No suppressHydrationWarning usage - all issues properly fixed
✅ Ready for customization

## Tech Stack
- **Backend**: Medusa v2.0 (Headless Commerce)
- **Frontend**: Next.js 15 with App Router
- **CMS**: Sanity
- **Database**: PostgreSQL
- **Cache**: Redis
- **File Storage**: S3-compatible
- **Email**: Resend
- **Payment**: Stripe

## Environment Setup

### Backend Environment Variables (`backend/.env`)

```bash
# CORS Configuration
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:7000,http://localhost:7001,https://docs.medusajs.com
AUTH_CORS=http://localhost:7000,http://localhost:7001,https://docs.medusajs.com

# Redis Cache
REDIS_URL=redis://localhost:6379

# Security Keys (CHANGE IN PRODUCTION!)
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
DB_NAME=medusa_db
POSTGRES_URL=postgresql://user:password@localhost:5432/medusa_db

# Backend URL
BACKEND_URL=http://localhost:9000  # Production: https://your-domain.com

# S3 File Storage
S3_FILE_URL=https://s3.region.amazonaws.com/bucket-name
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_REGION=us-east-1
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://s3.region.amazonaws.com

# Sanity CMS Integration
SANITY_API_TOKEN=your_sanity_token
SANITY_PROJECT_ID=1wtf7iqx  # Current project ID

# Email Service (Resend)
MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Frontend Environment Variables (`storefront/.env`)

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=1wtf7iqx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-02

# Medusa Backend
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000/store  # Production: https://api.your-domain.com/store
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxx

# Stripe Payment
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxxxxxxxxxxxx
```

## Key Features & Fixes

### Hydration Fixes Implemented
- ✅ Dynamic favicon converted to client component
- ✅ Bottom border scroll detection with mounting state
- ✅ Iframe detection with proper client-side handling
- ✅ All suppressHydrationWarning removed and replaced with proper fixes
- ✅ Sticky ATC component hydration fixed

### Cart Functionality
- API routes implemented for cart operations
- Proper server-client communication
- No more "Invalid Server Actions request" errors

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis

### Quick Start
```bash
git clone https://github.com/div197/BOB-Medusa.git
cd BOB-Medusa

# Backend setup
cd backend
yarn install
cp .env.template .env
# Configure .env
yarn medusa db:migrate
yarn dev

# Frontend setup (new terminal)
cd storefront
yarn install
cp .env.template .env
# Configure .env
yarn dev
```

## Support
For issues or questions, please open an issue in the GitHub repository.

---
Last Updated: December 2024
Stable Version: 90% Functional
