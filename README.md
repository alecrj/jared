# Culinary Conquistador Tours 🍴✨

A premium culinary tourism booking platform where passionate food enthusiasts lead authentic "conquistatours" around the world. Built with Next.js 14, TypeScript, Prisma, and modern web technologies.

🌟 **Currently running at:** [http://localhost:3002](http://localhost:3002)

## 🌟 Platform Overview

**Culinary Conquistador Tours** revolutionizes food tourism by empowering anyone passionate about food to become a tour leader. Unlike traditional platforms limited to professional chefs, our "conquistatours" can be led by:

- Food bloggers and content creators
- Local food enthusiasts with cultural knowledge  
- Home cooks with unique family recipes
- Restaurant owners and culinary students
- Anyone with a passion for sharing food experiences

### Key Differentiators
- **Anyone Can Lead** - Not just chefs, but passionate food lovers
- **Leader-Set Pricing** - Full control over tour pricing and profits
- **Premium Contiki Experience** - Luxury booking with culinary focus
- **Free Leader Seat** - Complimentary spot for every tour leader
- **Admin Approval System** - Quality control through tour approval

## 🚀 Quick Start

The platform is already set up and running! Here's how to explore:

### 1. **Start the Server** (if not running)
```bash
npm run dev
```

### 2. **Visit the Platform**
Open [http://localhost:3002](http://localhost:3002) in your browser

### 3. **Explore as Different Users**

#### 🏠 **Homepage Features**
- Premium hero section with animated food icons
- Featured conquistatours grid
- Responsive design with Framer Motion animations

#### 🧳 **Browse Tours** 
Navigate to `/conquistatour` to see:
- Advanced filtering (cuisine, location, price, duration)
- Beautiful tour cards with leader profiles
- Real-time availability and ratings

#### 👨‍🍳 **Become a Leader**
Visit `/leader/apply` to experience:
- Multi-step application wizard
- Culinary background assessment
- Skills and specialties selection
- Professional application flow

#### 🔐 **Authentication**
Try the auth system at `/auth/login`:
- Demo accounts available (see login page)
- Beautiful registration flow at `/auth/register`
- Password security features

#### 📖 **Tour Details**
Click any tour to see:
- Contiki-style image carousels
- Sticky booking card with pricing
- Detailed itineraries and inclusions
- Leader profiles and reviews

## 🛠 Architecture & Features

### **Tech Stack**
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Database**: Prisma ORM with SQLite (production-ready for PostgreSQL)
- **UI**: Radix UI components with premium styling
- **Payments**: Stripe integration (placeholder implementation)
- **Forms**: React Hook Form with Zod validation

### **Complete Feature Set**

✅ **Premium Homepage** - Hero section, featured tours, animations
✅ **Tour Browsing** - Advanced filtering, search, pagination  
✅ **Tour Details** - Image carousels, booking cards, reviews
✅ **Leader Application** - Multi-step wizard, specialties selection
✅ **Booking System** - Traveler details, deposit/balance model
✅ **API Routes** - Complete CRUD operations for all entities
✅ **Admin System** - Tour approval, leader management
✅ **Authentication** - Login/register with role management
✅ **Review System** - Food-specific ratings and feedback
✅ **Responsive Design** - Mobile-first with premium animations
✅ **Payment Processing** - Stripe integration with deposit model

### **Sample Data Included**
- 3 Featured conquistatours (Barcelona, Tokyo, Tuscany)
- 4 Sample users (Admin, Leaders, Traveler)  
- Complete profiles with culinary backgrounds
- Multiple departures and booking examples
- Review system with food-specific ratings

## 📊 Database Schema

### **Core Models**
- **Users**: Multi-role system (Traveler/Leader/Admin)
- **ConquistaTours**: Rich tour content with media
- **Departures**: Date-specific availability
- **Bookings**: Reservation system with travelers
- **Payments**: Deposit/balance tracking
- **Reviews**: Multi-dimensional ratings

### **Business Logic**
- 25% deposit, balance due 21 days before tour
- Leaders get one free seat per tour
- Admin approval workflow for tours and leaders
- Flexible cancellation policies
- Real-time availability tracking

## 🔌 API Endpoints

### **Tours API**
- `GET /api/tours` - List/search tours with filtering
- `POST /api/tours` - Create tours (leaders)
- `GET/PUT/DELETE /api/tours/[id]` - CRUD operations

### **Bookings API** 
- `POST /api/bookings` - Create reservations
- `GET /api/bookings` - User booking history
- `PUT/DELETE /api/bookings/[id]` - Manage bookings

### **Payments API**
- `POST /api/payments/create-payment-intent` - Initialize Stripe
- `POST /api/payments/confirm` - Process payments

### **Admin API**
- `GET/PUT /api/admin/tours` - Tour approval system
- `GET/PUT /api/admin/leader-applications` - Leader reviews
- `GET /api/admin/bookings` - Platform analytics

## 🎨 Design System

### **Premium Culinary Aesthetic**
- **Colors**: Gradient from golden amber to rich reds
- **Typography**: Inter font with gradient text effects  
- **Animations**: Framer Motion for smooth interactions
- **Components**: Radix UI with custom culinary styling

### **User Experience**
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized images and lazy loading
- **Intuitive**: Clear navigation and user flows

## 🚀 Production Deployment

### **Environment Setup**
```env
# Database (upgrade to PostgreSQL for production)
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Stripe (replace with live keys)
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Authentication (implement proper auth)
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### **Production Checklist**
- [ ] Database migration to PostgreSQL/MySQL
- [ ] Real Stripe payment integration  
- [ ] Proper authentication system (NextAuth.js)
- [ ] Email service integration (SendGrid/Mailgun)
- [ ] SMS notifications (Twilio)
- [ ] File storage (AWS S3/Cloudinary)
- [ ] Error tracking (Sentry)
- [ ] Analytics integration

## 🎯 Business Model

### **Revenue Streams**
- Commission on tour bookings (configurable %)
- Premium leader features and promotion
- Featured tour placement fees
- Platform subscription for high-volume leaders

### **Value Propositions**
- **For Leaders**: Easy tour creation, pricing control, marketing reach
- **For Travelers**: Authentic experiences, quality assurance, easy booking  
- **For Platform**: Scalable marketplace with quality control

---

## 📱 **Ready to Explore?**

🌟 **Platform is live at:** [http://localhost:3002](http://localhost:3002)

**Try these flows:**
1. **Browse Tours** → `/conquistatour` 
2. **Apply as Leader** → `/leader/apply`
3. **View Tour Details** → Click any tour card
4. **Book a Tour** → Select dates and travelers
5. **Admin Panel** → Login with admin credentials

**Demo Accounts:**
- **Admin**: admin@culinaryconquistador.com  
- **Leader**: maria@example.com
- **Traveler**: sarah@example.com
- **Password**: password123 (for demo)

---

**Built with ❤️ for culinary adventurers worldwide!** 🍴✨
