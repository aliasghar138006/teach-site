import styles from "@/components/modules/MyCourses.module.css";
import userData from "@/utils/userData";
import Card from "./Card";
import { e2p } from "@/utils/Operations";
import Link from "next/link";
import ItemBox from "../elements/ItemBox";
import NotFound from "../elements/NotFound";
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

  if (userInfo.role === "teacher") {
    return (
      <div className={styles.container}>
        {!teacherCourses.length && (
          <NotFound text="دوره ای برای نمایش وجود ندارد" />
        )}
        {teacherCourses?.map((item, index) => (
          <div className={styles.teacherCourses} key={index}>
            <ItemBox key={index} index={index} item={item} />
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
  } else if (userInfo.role === "admin") {
    return (
      <div className={styles.container}>
        {!data.length && <NotFound text="دوره ای برای نمایش وجود ندارد" />}
        {data?.map((item, index) => (
          <ItemBox key={index} index={index} item={item} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        {!userInfo.courses.length && (
          <NotFound text="دوره ای برای نمایش وجود ندارد" />
        )}
        {userInfo.courses?.map((item, index) => (
          <ItemBox key={index} index={index} item={item} />
        ))}
      </div>
    );
  }
}

export default MyCourses;
