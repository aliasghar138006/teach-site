import { compare, hash } from "bcryptjs";

export async function HashPassword(password) {
  const hashed_password = await hash(password, 12);
  return hashed_password;
}

export async function VerifyPassword(password, hashedPassword) {
  const verifyPassword = await compare(password, hashedPassword);
  return verifyPassword;
}
