import Add from "@/components/modules/Add";
import userData from "@/utils/userData";
import { redirect } from "next/navigation";

async function page() {
  const data = await userData();
  if (!data.role === "teacher") {
    redirect("/");
  }
  return <Add userData={data} />;
}

export default page;
