import Image from "next/image";
import styles from "./MainPage.module.css";
import { sp, e2p } from "@/utils/Operations";
import { GiTeacher } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import TitleBox from "../modules/TitleBox";
import Slider from "../modules/Slider";

async function MainPage() {
  const url = process.env.BASE_URL;

  const res = await fetch(`${url}/account/courses/`, {
    next: { revalidate: 5 },
  });
  const data = await res.json(res);
  const newCourses = data.slice(0, 4);

  return (
    <div className={styles.container}>
      <Slider />
      <TitleBox title="جدیدترین دوره ها" />
      <div className={styles.courses}>
        {newCourses?.map((item, index) => (
          <div className={styles.card} key={index}>
            <Image
              width={250}
              height={150}
              alt="image"
              src={`${url.concat(item.image)}`}
            />
            <div>{item.title}</div>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.details}>
              <div>
                <span>
                  <GiTeacher />
                </span>
                {item.teacher}
              </div>
              <div>
                <span>
                  <FaMoneyBill />
                </span>
                {sp(item.price)}تومان
              </div>
            </div>
            <button>مشاهده دوره</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
