import { VerifyPassword } from "./Operations";

export default async function CheckAuth() {
  const res = await fetch("http://127.0.0.1:8000/account/users/");
  const data = await res.json();
  if (document.cookie) {
    const cookie = JSON.parse(document.cookie);
    const result = data.filter((item) => item.userName === cookie.userName);
    const verifyPassword = await VerifyPassword(
      result[0].password,
      cookie.password
    );

    if (result.length && verifyPassword) {
      return true;
    } else {
      return false;
    }
  }
}
