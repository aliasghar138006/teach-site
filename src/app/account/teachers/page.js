import Teachers from "@/components/modules/Teachers";
import userData from "@/utils/userData";

async function page() {
  const userInfo = await userData();
  if (userInfo.role !== "admin") return;
  return <Teachers />;
}

export default page;
