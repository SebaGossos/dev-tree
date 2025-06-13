//? --------- USERS TYPES ----------
export type User = {
  handle: string;
  name: string;
  email: string;
  description: string;
  image: string;
  _id: string;
};

export type UserForm = Pick<User, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type ProfileForm = Pick<User, "handle" | "description">;

//? --------- LINKS TYPES ----------
export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled' >