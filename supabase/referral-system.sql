-- Referral System Database Functions
-- Run these in your Supabase SQL Editor

-- 1. Function to generate a unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 8-character code
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT) FROM 1 FOR 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM profiles WHERE referral_code = code) INTO exists_check;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT exists_check;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 2. Function to process a referral when a new user signs up
CREATE OR REPLACE FUNCTION process_referral(
  new_user_id UUID,
  referral_code_param TEXT
)
RETURNS JSON AS $$
DECLARE
  referrer_id UUID;
  referral_points INTEGER := 25; -- Points to award to referrer
  new_user_points INTEGER := 10; -- Bonus points for new user
BEGIN
  -- Find the referrer by their referral code
  SELECT id INTO referrer_id
  FROM profiles
  WHERE referral_code = referral_code_param
  LIMIT 1;
  
  -- If referrer found, process the referral
  IF referrer_id IS NOT NULL THEN
    -- Update referrer's stats and award points
    UPDATE profiles
    SET 
      total_referrals = COALESCE(total_referrals, 0) + 1,
      referral_earnings = COALESCE(referral_earnings, 0) + referral_points,
      points_balance = COALESCE(points_balance, 0) + referral_points
    WHERE id = referrer_id;
    
    -- Create transaction for referrer
    INSERT INTO transactions (user_id, amount, type, description)
    VALUES (
      referrer_id,
      referral_points,
      'earned',
      'Referral bonus: ' || referral_code_param
    );
    
    -- Award bonus points to new user
    UPDATE profiles
    SET points_balance = COALESCE(points_balance, 0) + new_user_points
    WHERE id = new_user_id;
    
    -- Create transaction for new user
    INSERT INTO transactions (user_id, amount, type, description)
    VALUES (
      new_user_id,
      new_user_points,
      'bonus',
      'Sign up bonus via referral'
    );
    
    RETURN json_build_object(
      'success', true,
      'referrer_id', referrer_id,
      'points_awarded', referral_points
    );
  ELSE
    RETURN json_build_object(
      'success', false,
      'error', 'Invalid referral code'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger function to generate referral code when profile is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_referral_code TEXT;
  referral_code_from_metadata TEXT;
BEGIN
  -- Generate a unique referral code for the new user
  user_referral_code := generate_referral_code();
  
  -- Get referral code from auth.users metadata if provided
  SELECT raw_user_meta_data->>'referral_code' INTO referral_code_from_metadata
  FROM auth.users
  WHERE id = NEW.id;
  
  -- Set the referral code in the profile
  NEW.referral_code := user_referral_code;
  
  -- Initialize other fields if not set
  NEW.points_balance := COALESCE(NEW.points_balance, 0);
  NEW.streak_count := COALESCE(NEW.streak_count, 0);
  NEW.total_referrals := COALESCE(NEW.total_referrals, 0);
  NEW.referral_earnings := COALESCE(NEW.referral_earnings, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger to call handle_new_user when profile is created
DROP TRIGGER IF EXISTS on_profile_created ON profiles;
CREATE TRIGGER on_profile_created
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- 5. Function to process referral after profile is created (called from trigger or RPC)
CREATE OR REPLACE FUNCTION process_referral_after_signup()
RETURNS TRIGGER AS $$
DECLARE
  referral_code_from_metadata TEXT;
BEGIN
  -- Get referral code from auth.users metadata
  SELECT raw_user_meta_data->>'referral_code' INTO referral_code_from_metadata
  FROM auth.users
  WHERE id = NEW.id;
  
  -- If referral code exists, process the referral
  IF referral_code_from_metadata IS NOT NULL AND referral_code_from_metadata != '' THEN
    PERFORM process_referral(NEW.id, referral_code_from_metadata);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger to process referral after profile creation
DROP TRIGGER IF EXISTS on_referral_process ON profiles;
CREATE TRIGGER on_referral_process
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION process_referral_after_signup();

-- Note: Make sure your profiles table has these columns:
-- - referral_code (TEXT, UNIQUE)
-- - points_balance (INTEGER, DEFAULT 0)
-- - streak_count (INTEGER, DEFAULT 0)
-- - total_referrals (INTEGER, DEFAULT 0)
-- - referral_earnings (INTEGER, DEFAULT 0)
--
-- The referral code from signup is stored in auth.users.raw_user_meta_data->>'referral_code'
-- and is accessed via the triggers above.

-- Also ensure your transactions table has:
-- - user_id (UUID, REFERENCES profiles(id))
-- - amount (INTEGER)
-- - type (TEXT) - 'earned', 'redeemed', 'bonus'
-- - description (TEXT)
-- - created_at (TIMESTAMP, DEFAULT NOW())

