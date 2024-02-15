"use client";
import Image from "next/image";
import styles from "./Header.module.css";
import { IoIosArrowDown } from "react-icons/io";
import List from "./List";
import { useState } from "react";

function Header() {
  const [category, setCategory] = useState([
    { subCategory: ["ریاضی1"], title: "دروس دانشگاهی", show: false },
    { subCategory: ["React", "Vue"], title: "طراحی سایت", show: false },
    {
      subCategory: ["ReactNative", "Xamarin"],
      title: "طراحی اپلیکیشن",
      show: false,
    },
    {
      subCategory: ["مسیر برنامه نویسی", "هوش مصنوعی چیست؟"],
      title: "مقالات",
      show: false,
    },
  ]);

  const EnterHandler = (index) => {
    const categoriesList = [...category];
    categoriesList[index].show = true;
    setCategory(categoriesList);
  };

  const LeaveHandler = (index) => {
    const categoriesList = [...category];
    categoriesList[index].show = false;
    setCategory(categoriesList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.logo}>
          <Image src={"/images/logo.jpg"} width={70} height={70} alt="logo" />
        </div>
        <ul className={styles.list}>
          {category.map((item, index) => (
            <div key={index}>
              <li
                onMouseEnter={() => EnterHandler(index)}
                onMouseLeave={() => LeaveHandler(index)}
              >
                {item.title}
                <IoIosArrowDown />
              </li>
              {item.show && <List courseItem={item.subCategory} />}
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.left}>
        <button>عضویت</button>
        <button>ورود</button>
      </div>
    </div>
  );
}

export default Header;
