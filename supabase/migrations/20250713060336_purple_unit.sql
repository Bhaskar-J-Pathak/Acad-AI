/*
  # Authentication System Setup

  1. Security Configuration
    - Enable RLS on auth.users (handled by Supabase automatically)
    - Create policies for user data access
    - Set up proper authentication flow

  2. User Profiles
    - `profiles` table for additional user data
    - Automatic profile creation on signup
    - Phone number support

  3. Security
    - Row Level Security enabled
    - Users can only access their own data
    - Proper authentication policies
*/

-- Create profiles table for additional user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text,
  phone text,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, phone, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create courses table for future use
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price_standard integer DEFAULT 9900, -- $99.00 in cents
  price_pro integer DEFAULT 19900, -- $199.00 in cents
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read courses
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create user_courses table for tracking purchases
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  version text CHECK (version IN ('standard', 'pro')) NOT NULL,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS on user_courses
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Users can only see their own course purchases
CREATE POLICY "Users can view own course purchases"
  ON user_courses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own course purchases"
  ON user_courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert the Frontend Development course
INSERT INTO courses (title, description, price_standard, price_pro)
VALUES (
  'Frontend Development',
  'Master modern web development from zero to hero with HTML, CSS, JavaScript, React, and more.',
  9900,
  19900
) ON CONFLICT DO NOTHING;