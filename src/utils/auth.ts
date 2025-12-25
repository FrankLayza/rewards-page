import supabase from "./supbaseClient";

export const signUpUser = async (
  email: string,
  password: string,
  fullName: string,
  referralCode?: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        referral_code: referralCode || null,
      },
    },
  });

  return { data, error };
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  // ✅ FIXED: Now correctly returns the user data
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};
