import AccountPage from "@/components/templates/AccountPage";

import userData from "@/utils/userData";

export default async function AccountLayout({ children }) {
  // const cookie = cookies();
  // const userData = cookie.getAll()[0]?.name;
  // if (!userData) redirect("/signin");
  // const userName = JSON.parse(userData);
  // const res = await fetch(`${url}/account/users/${userName}/`);
  // const data = await res.json();

  return <AccountPage>{children}</AccountPage>;
}
