import Image from "next/image";
import styles from "./MainPage.module.css";
import { GiTeacher } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import TitleBox from "../modules/TitleBox";
import Slider from "../modules/Slider";
import Card from "../modules/Card";

async function MainPage() {
  const url = process.env.BASE_URL;

  const res = await fetch(`${url}/account/courses/`, {
    next: { revalidate: 5 },
  });
  const data = await res.json(res);
  const newCourses = data.slice(0, 4);
  const filteredCoursesByScore = data.filter((item) => item.score > 3);
  const popularCourses = filteredCoursesByScore.slice(0, 4);

  const articleRes = await fetch(`${url}/articles/`, {
    next: { revalidate: 5 },
  });

  const articleData = await articleRes.json();
  const newArticles = articleData.slice(0, 4);

  return (
    <div className={styles.container}>
      <Slider />
      <TitleBox title="جدیدترین دوره ها" />
      <div className={styles.courses}>
        {newCourses?.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <TitleBox title="محبوب ترین دوره ها" />
      <div className={styles.courses}>
        {popularCourses?.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <TitleBox title="جدیدترین مقالات" />
      <div className={styles.courses}>
        {newArticles?.map((item, index) => (
          <Card
            key={index}
            item={item}
            type="article"
            titleBtn="مطالعه مقاله"
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
