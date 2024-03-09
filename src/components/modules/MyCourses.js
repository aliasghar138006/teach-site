import styles from "@/components/modules/MyCourses.module.css";
import userData from "@/utils/userData";
import Card from "./Card";
import { e2p } from "@/utils/Operations";
import Link from "next/link";
async function MyCourses() {
  const userInfo = await userData();

  return (
    <div className={styles.container}>
      {userInfo.courses?.map((item, index) => (
        <Link key={index} href={`/courses/${item.id}`}>
          <div className={styles.item}>
            <span>{e2p(index + 1)}</span>
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyCourses;
