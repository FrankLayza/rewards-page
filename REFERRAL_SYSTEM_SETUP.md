# Referral System Setup Guide

## Overview

The referral system allows users to:
- Generate unique referral codes
- Share referral links
- Earn 25 points when someone signs up using their referral code
- New users get 10 bonus points when signing up via referral

## Database Setup

### 1. Run the SQL Migration

Execute the SQL file `supabase/referral-system.sql` in your Supabase SQL Editor. This will create:
- `generate_referral_code()` - Generates unique referral codes
- `process_referral()` - Processes referrals and awards points
- `handle_new_user()` - Trigger function to generate referral codes
- `process_referral_after_signup()` - Trigger function to process referrals

### 2. Required Database Schema

Ensure your `profiles` table has these columns:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  referral_code TEXT UNIQUE,
  points_balance INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  referral_earnings INTEGER DEFAULT 0,
  last_claimed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Ensure your `transactions` table has:

```sql
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'redeemed', 'bonus')),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Row Level Security (RLS)

Make sure RLS policies allow users to:
- Read their own profile
- Update their own profile
- Read their own transactions
- Insert transactions (via functions)

## How It Works

### Sign Up Flow

1. User clicks referral link: `https://yoursite.com/signup?ref=ABC12345`
2. SignUp component reads the `ref` parameter from URL
3. User fills out signup form
4. `signUpUser()` is called with the referral code
5. User is created in Supabase Auth
6. Database trigger `on_profile_created` generates a unique referral code for the new user
7. Database trigger `on_referral_process` processes the referral:
   - Finds the referrer by their referral code
   - Awards 25 points to the referrer
   - Awards 10 bonus points to the new user
   - Updates referral stats
   - Creates transaction records

### Referral Link Generation

- Each user gets a unique 8-character referral code
- Referral links are generated as: `${origin}/signup?ref=${referralCode}`
- Links can be shared via social media (Facebook, Twitter, LinkedIn, WhatsApp)

### Points System

- **Referrer**: Earns 25 points when someone signs up using their code
- **New User**: Gets 10 bonus points when signing up via referral
- All points are tracked in the `transactions` table

## Testing

1. **Test Referral Code Generation**:
   - Sign up a new user
   - Check that they have a referral code in their profile

2. **Test Referral Processing**:
   - Get a referral code from User A
   - Sign up User B with that referral code
   - Verify:
     - User A's `total_referrals` increased by 1
     - User A's `referral_earnings` increased by 25
     - User A's `points_balance` increased by 25
     - User B's `points_balance` is 10 (bonus points)
     - Transaction records are created for both users

3. **Test Invalid Referral Code**:
   - Sign up with an invalid referral code
   - Should not break signup process
   - Should not award any points

## Troubleshooting

### Referral codes not generating
- Check that the trigger `on_profile_created` is active
- Verify the `generate_referral_code()` function exists
- Check database logs for errors

### Referrals not processing
- Verify the `process_referral()` function exists
- Check that referral code is being passed in user metadata
- Verify RLS policies allow function execution
- Check database logs for errors

### Points not updating
- Verify transaction records are being created
- Check that `points_balance` updates are working
- Ensure RLS policies allow updates

## Security Considerations

- Functions use `SECURITY DEFINER` to bypass RLS when needed
- Referral codes are unique and cannot be duplicated
- Invalid referral codes don't break the signup process
- All operations are logged in the transactions table

