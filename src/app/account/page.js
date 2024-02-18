import AccountPage from "@/components/templates/AccountPage";
import { VerifyPassword } from "@/utils/Operations";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
async function page() {
  // const url = process.env.NEXT_PUBLIC_BASE_URL;
  // const res = await fetch(`${url}/account/users/`);
  // const data = await res.json();

  // const cookie = cookies().getAll()[0];

  // if (!cookie) {
  //   redirect("/signin");
  // }

  // const cookieStore = JSON.parse(cookie.name);

  // const result = data.filter((item) => item.userName == cookieStore.userName);

  // const verifyPassword = await VerifyPassword(
  //   result[0].password,
  //   cookieStore.password
  // );

  // if (!result.length || !verifyPassword) {
  //   redirect("/signin");
  // }

  return <AccountPage />;
}

export default page;
