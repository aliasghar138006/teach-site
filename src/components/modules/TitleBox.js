import styles from "@/components/templates/MainPage.module.css";
import { BiLeftArrowAlt } from "react-icons/bi";

function TitleBox({ title, seeAll = true }) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleBox}>
        <h3>{title}</h3>
        <div></div>
      </div>
      <div>
        {seeAll && (
          <div>
            مشاهده همه
            <BiLeftArrowAlt />
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleBox;
