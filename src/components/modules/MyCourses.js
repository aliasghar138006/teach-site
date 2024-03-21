import styles from "@/components/modules/MyCourses.module.css";
import userData from "@/utils/userData";
import Card from "./Card";
import { e2p } from "@/utils/Operations";
import Link from "next/link";
async function MyCourses() {
  const userInfo = await userData();
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/account/courses/`, {
    next: {
      revalidate: 5,
    },
  });

  const data = await res.json();
  const teacherCourses = data.filter(
    (item) =>
      item.teacher === userInfo.userName || item.teacher === userInfo.fullName
  );

  console.log(teacherCourses);

  if (userInfo.role === "teacher") {
    return (
      <div className={styles.container}>
        {!teacherCourses.length && (
          <div className={styles.message}>دوره ای برای نمایش وجود ندارد</div>
        )}
        {teacherCourses?.map((item, index) => (
          <div className={styles.teacherCourses} key={index}>
            <Link href={`/courses/${item.id}`}>
              <div className={styles.item}>
                <span>{e2p(index + 1)}</span>
                {item.title}
              </div>
            </Link>
            <div
              className={styles.status}
              style={{ backgroundColor: item.published ? "green" : "orange" }}
            >
              {item.published ? "منتشر شده" : "در حال بررسی"}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        {!userInfo.courses.length && (
          <div className={styles.message}>دوره ای برای نمایش وجود ندارد</div>
        )}
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
}

export default MyCourses;
