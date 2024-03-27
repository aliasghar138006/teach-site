import MyCourses from "@/components/modules/MyCourses";
import userData from "@/utils/userData";

async function page() {
  const userInfo = await userData();
  if (userInfo.role !== "admin") return;
  return <MyCourses />;
}

export default page;
