import { cookies } from "next/headers";

async function userData() {
  const url = process.env.BASE_URL;
  const cookie = cookies();
  const userName = JSON.parse(cookie.getAll()[0].name).userName;
  const res = await fetch(`${url}/account/users/${userName}/`);
  const data = await res.json();
  return data;
}

export default userData;
