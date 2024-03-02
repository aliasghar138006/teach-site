"use client";
import Image from "next/image";
import styles from "./Header.module.css";
import { IoIosArrowDown } from "react-icons/io";
import List from "./List";
import { useEffect, useState } from "react";
import Link from "next/link";
import CheckAuth from "@/utils/CheckAuth";
import { redirect, useRouter } from "next/navigation";

function Header() {
  const [category, setCategory] = useState([]);
  const [profile, setProfile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const categoryData = async () => {
      const res = await fetch("http://127.0.0.1:8000/category/");
      const data = await res.json();
      setCategory(data);
    };

    categoryData();
    const Authentication = async () => {
      const auth = await CheckAuth();

      if (auth) {
        setProfile(true);
      }
    };

    Authentication();
  }, []);

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
        <div onClick={() => router.push("/")} className={styles.logo}>
          <Image
            src={"/images/logo.jpg"}
            width={70}
            height={70}
            alt="logo"
            priority={1}
          />
        </div>
        <ul className={styles.list}>
          {category.map((item, index) => (
            <div key={index} onMouseLeave={() => LeaveHandler(index)}>
              <li onMouseEnter={() => EnterHandler(index)}>
                {item.title}
                <IoIosArrowDown />
              </li>
              {item.show && <List courseItem={item.subCategory} />}
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.left}>
        {profile ? (
          <Link href={"/account"}>
            <button>حساب کاربری</button>
          </Link>
        ) : (
          <div>
            <Link href={"/signup"}>
              <button>عضویت</button>
            </Link>
            <Link href={"/signin"}>
              <button>ورود</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
