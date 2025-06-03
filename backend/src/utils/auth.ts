import bcrypt from "bcrypt";


export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds)
};

export const comparePassword = async (password: string, hashedPassword: string, ) => await bcrypt.compare(password, hashedPassword);

