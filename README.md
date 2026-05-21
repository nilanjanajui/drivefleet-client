# 🚗 DriveFleet — Premium Car Rental Platform

<div align="center">

**A modern, full-stack car rental platform where users can explore, book, and manage premium vehicles — all in one place.**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-drivefleet--client--sigma.vercel.app-blue?style=for-the-badge)](https://drivefleet-client-sigma.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/password and Google OAuth login powered by Better Auth with HTTPOnly cross-domain cookies (SameSite=None), keeping sessions persistent across Vercel and Render deployments
- 🚙 **Full Car Listing Management** — Any logged-in user can list their own cars with detailed info including type, daily price, seat capacity, pickup location, and images; edit or delete listings at any time from the My Added Cars dashboard
- 📅 **Smart Booking System** — Book any available car with optional driver assignment and special notes; every booking increments the car's popularity counter and is tracked with a confirmed/cancelled status
- 🔍 **Advanced Search & Filter** — Search cars by name using MongoDB `$regex`, filter by category using `$in`, and sort by price (low/high), newest first, or most popular — all wired directly to the database
- 📊 **Personal Booking Dashboard** — View all bookings with tab filters (All / Active / Pending / Cancelled), cancel active bookings through a confirmation modal, and re-book cancelled cars in one click

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Authentication | Better Auth (email/password + Google OAuth) |
| Session Storage | HTTPOnly cookie (SameSite=None, Secure) |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| UI Components | HeroUI |
| Animations | Framer Motion |
| Images | next/image (unoptimized for external URLs) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js                  # Home page
│   ├── layout.js                # Root layout with Navbar + Footer
│   ├── not-found.js             # Custom 404 page
│   ├── login/page.jsx           # Login with email & Google
│   ├── register/page.jsx        # Register with password validation
│   ├── add-car/page.jsx         # Add new car listing (private)
│   ├── explore-cars/page.jsx    # Browse all cars with search/filter/sort
│   ├── cars/[id]/page.jsx       # Car details + Book Now modal
│   ├── my-added-cars/page.jsx   # Manage own listings (private)
│   └── my-bookings/page.jsx     # View and cancel bookings (private)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx           # Sticky navbar with profile dropdown + mobile menu
│   │   └── Footer.jsx           # Footer with social icons and useful links
│   ├── home/
│   │   ├── HeroBanner.jsx       # Landing hero section
│   │   ├── AvailableCars.jsx    # DB-wired car cards (min 6)
│   │   ├── WhyChooseUs.jsx      # Static features section
│   │   ├── CustomerReviews.jsx  # Static testimonials section
│   │   └── CTASection.jsx       # Call-to-action section
│   ├── PrivateRoute.jsx         # Auth guard wrapper component
│   └── LoadingSpinner.jsx       # Global loading indicator
│
├── context/
│   └── AuthContext.jsx          # Global auth state (user, signUp, logOut, googleSignIn)
│
└── lib/
    └── authClient.js            # Better Auth client instance
```

---

## 📄 Pages Overview

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Explore Cars | `/explore-cars` | Public |
| Car Details | `/cars/[id]` | Logged-in only |
| Add Car | `/add-car` | Private |
| My Added Cars | `/my-added-cars` | Private |
| My Bookings | `/my-bookings` | Private |
| Login | `/login` | Public |
| Register | `/register` | Public |
| 404 | `/*` | Public |

---

## 🔒 Authentication Flow

- Users register with name, email, photo URL, and password
- Password must be at least 6 characters with at least one uppercase and one lowercase letter
- On successful registration, users are redirected to the login page
- Google OAuth is available on both login and register pages
- Session is maintained via an HTTPOnly cookie — private routes remain accessible on reload
- Unauthenticated access to private routes redirects to `/login` using `router.replace()`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [DriveFleet Server](https://github.com/nilanjanajui/drivefleet-server)

### Installation

```bash
git clone https://github.com/nilanjanajui/drivefleet-client.git
cd drivefleet-client
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

The client is deployed on **Vercel**.

Live URL: **[https://drivefleet-client-sigma.vercel.app](https://drivefleet-client-sigma.vercel.app)**

> Make sure `NEXT_PUBLIC_API_URL` points to the deployed Render server URL in Vercel's environment variable settings.

---

## 🔗 Related Repository

- **Server (Express + MongoDB):** [github.com/nilanjanajui/drivefleet-server](https://github.com/nilanjanajui/drivefleet-server)
