import styles from "./List.module.css";

function List({ courseItem }) {
  return (
    <ul className={styles.container}>
      {courseItem?.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default List;
