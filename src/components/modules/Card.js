import styles from "@/components/templates/MainPage.module.css";
import Image from "next/image";
import { GiTeacher } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { sp } from "@/utils/Operations";

function Card({ item, type = "course", titleBtn = "مشاهده دوره" }) {
  const url = process.env.BASE_URL;
  return (
    <div className={styles.card}>
      <Image
        width={250}
        height={150}
        alt="image"
        src={`${url.concat(item.image)}`}
      />
      <div>{item.title}</div>
      <p className={styles.description}>{item.description}</p>
      {type === "course" ? (
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
      ) : (
        <div className={styles.details}>
          <div>
            <span>
              <FaUserPen />
            </span>
            {item.author}
          </div>
        </div>
      )}
      <button>{titleBtn}</button>
    </div>
  );
}

export default Card;
