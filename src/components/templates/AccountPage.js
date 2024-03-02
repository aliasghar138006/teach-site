import styles from "@/components/templates/Account.module.css";
import Sidebar from "../modules/Sidebar";

function AccountPage({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Sidebar />
      </div>
      <div className={styles.left}>{children}</div>
    </div>
  );
}

export default AccountPage;
