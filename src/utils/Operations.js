import { compare, hash } from "bcryptjs";

export async function HashPassword(password) {
  const hashed_password = await hash(password, 12);
  return hashed_password;
}

export async function VerifyPassword(password, hashedPassword) {
  const verifyPassword = await compare(password, hashedPassword);
  return verifyPassword;
}

const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const numbers = seperatedNumber.split("").reverse();

  let finalNumber = "";

  for (let i = 0; i < numbers.length; i++) {
    finalNumber += numbers[i];
    if ((i + 1) % 3 === 0) {
      finalNumber += ",";
    }
  }
  const splitNumber = finalNumber.split("").reverse();

  let result = "";
  splitNumber.map((item) => {
    result += item;
  });

  return result;
};

const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export { sp, e2p };
