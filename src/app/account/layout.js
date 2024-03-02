import AccountPage from "@/components/templates/AccountPage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AccountLayout({ children }) {
  const url = process.env.BASE_URL;
  const cookie = cookies();
  const userData = cookie.getAll()[0]?.name;
  if (!userData) redirect("/signin");
  const userName = JSON.parse(userData);
  const res = await fetch(`${url}/account/users/${userName}/`);
  const data = await res.json();
  return <AccountPage data={data}>{children}</AccountPage>;
}
