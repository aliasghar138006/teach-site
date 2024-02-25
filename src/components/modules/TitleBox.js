import styles from "@/components/templates/MainPage.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";

function TitleBox({ title }) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleBox}>
        <h3>{title}</h3>
        <div></div>
      </div>
      <div>
        همه دوره ها
        <BiLeftArrowAlt />
      </div>
    </div>
  );
}

export default TitleBox;
