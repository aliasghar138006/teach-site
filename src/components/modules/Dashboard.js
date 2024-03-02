import styles from "@/components/modules/Dashboard.module.css";
import userData from "@/utils/userData";
import { cookies } from "next/headers";

async function Dashboard() {
  const data = await userData();

  return (
    <div className={styles.container}>
      <h3>{data.userName} عزیز خوش آمدی🙌</h3>
      <div>
        نام کاربری:<span>{data.userName}</span>
      </div>
      <div>
        تاریخ عضویت:
        <span>{new Date(data.joinAt).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default Dashboard;
