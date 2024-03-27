import Students from "@/components/modules/Students";
import userData from "@/utils/userData";

async function page() {
  const userInfo = await userData();
  if (userInfo.role !== "admin") return;
  return <Students />;
}

export default page;
