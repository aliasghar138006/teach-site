import styles from "./Footer.module.css";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <h4>درباره ما</h4>
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است{" "}
        </p>
      </div>
      <div>
        <h4>دسترسی سریع</h4>
        <ul>
          <li>قوانین</li>
          <li>دوره ها</li>
        </ul>
      </div>
      <div>
        <h4>لینک های مفید</h4>
        <ul>
          <li>آموزش ریاضیات</li>
          <li>آموزش جاوا اسکریپت</li>
        </ul>
      </div>
      <div>
        <h4>شبکه های اجتماعی</h4>
        <ul>
          <li>
            <FaSquareInstagram />
            teach_site@
          </li>
          <li>
            <FaTelegramPlane />
            teach_site@
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
