export type UserProfileToken = {
    email: string;
    nickname: string
    access: string;
    refresh: string;
  };
  
export type UserProfile = {
    nickname: string;
    email: string;
  };

  export type UserProfileDetail = {
    nickname: string;
    email: string;
    profile_image: null;
    age: number | null;
    gender: string | null;
    joined_at: string;
  }