import styles from "@/components/modules/MyCourses.module.css";

function NotFound({ text }) {
  return <div className={styles.message}>{text}</div>;
}

export default NotFound;
