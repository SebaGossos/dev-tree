export type User = {
  handle: string;
  name: string;
  email: string;
};

export type UserForm = Pick<User, "name" | "email" | "handle" > & {
  password: string;
  password_confirmation: string;
};
