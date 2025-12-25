# Rewards Page

A modern rewards and points management application built with React, TypeScript, Vite, and Supabase.

## Features

- 🎯 Earn points through daily check-ins and referrals
- 🎁 Redeem rewards with accumulated points
- 📊 Track your points balance and progress
- 🔥 Daily streak tracking
- 👥 Referral system with social sharing
- 📱 Fully responsive design
- 🔔 Notification system

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (recommended) or **npm** - [Install pnpm](https://pnpm.io/installation)
- **Supabase account** - [Sign up](https://supabase.com/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rewards-page
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Or create a new `.env.local` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

#### Getting Supabase Credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project or select an existing one
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### 4. Database Setup

Set up your Supabase database with the required tables and functions. You'll need:

- `profiles` table (for user points, streaks, referral codes)
- `transactions` table (for points history)
- `claim_daily_bonus` function (for daily bonus claims)

Refer to your database schema documentation for the exact table structure.

### 5. Run the Development Server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 6. Build for Production

```bash
pnpm build
```

Or with npm:
```bash
npm run build
```

The production build will be in the `dist` directory.

### 7. Preview Production Build

```bash
pnpm preview
```

Or with npm:
```bash
npm run preview
```

## Project Structure

```
rewards-page/
├── src/
│   ├── components/          # React components
│   │   ├── earn-points.tsx # Points earning interface
│   │   ├── redeem-rewards.tsx # Rewards redemption
│   │   ├── rewards-hub.tsx # Main rewards hub
│   │   ├── sidebar.tsx     # Navigation sidebar
│   │   └── ui/              # UI components
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx # Authentication context
│   │   └── RewardsContext.tsx # Rewards data context
│   ├── utils/               # Utility functions
│   │   ├── auth.ts         # Authentication utilities
│   │   └── supbaseClient.ts # Supabase client
│   └── main.tsx            # Application entry point
├── .env.local               # Environment variables (not in git)
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Supabase** - Backend and authentication
- **React Router** - Routing
- **Lucide React** - Icons
- **React Icons** - Additional icons

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
pnpm dev -- --port 3000
```

### Environment Variables Not Loading

- Ensure your `.env.local` file is in the root directory
- Restart the development server after adding/changing environment variables
- Variable names must start with `VITE_` to be accessible in the browser

### Supabase Connection Issues

- Verify your Supabase credentials in `.env.local`
- Check that your Supabase project is active
- Ensure your database tables and functions are properly set up
- Check browser console for specific error messages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

For more information about the technologies used:
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
