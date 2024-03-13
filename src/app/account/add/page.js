import Add from "@/components/modules/Add";
import userData from "@/utils/userData";
import { redirect } from "next/navigation";

async function page() {
  const { role } = await userData();
  if (!role === "teacher") {
    redirect("/");
  }
  return <Add />;
}

export default page;
