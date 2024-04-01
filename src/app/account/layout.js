import AccountPage from "@/components/templates/AccountPage";

import userData from "@/utils/userData";
import { redirect } from "next/navigation";

export const metadata = {
  title: "حساب کاربری",
};

export default async function AccountLayout({ children }) {
  return <AccountPage>{children}</AccountPage>;
}
