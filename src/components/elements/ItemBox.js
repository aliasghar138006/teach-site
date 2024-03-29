import { e2p } from "@/utils/Operations";
import styles from "@/components/modules/MyCourses.module.css";
import Link from "next/link";

function ItemBox({ index, item, type = "courses" }) {
  return (
    <>
      {type === "courses" ? (
        <Link href={`/courses/${item.id}`}>
          <div className={styles.item}>
            <span>{e2p(index + 1)}</span>
            {item.title}
          </div>
        </Link>
      ) : (
        <Link href={"/"}>
          <div className={styles.item}>
            <span>{e2p(index + 1)}</span>
            {item.fullName}
          </div>
        </Link>
      )}
    </>
  );
}

export default ItemBox;
