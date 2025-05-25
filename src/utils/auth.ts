import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds)

};
