import AccountPage from "@/components/templates/AccountPage";

import userData from "@/utils/userData";
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }) {
  return <AccountPage>{children}</AccountPage>;
}
