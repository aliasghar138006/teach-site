"use client";
import styles from "@/components/templates/Account.module.css";
import Item from "../elements/Item";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useRouter as routerData } from "next/router";

function Sidebar() {
  const [style, setStyle] = useState({
    dashboard: true,
    myCourse: false,
    edit: false,
    exit: false,
  });

  const router = useRouter();
  useEffect(() => {
    if (style.dashboard) {
      router.push("/account");
    }
  }, []);

  const clickHandler = (name) => {
    console.log(routerData.pathname);
    const items = {
      dashboard: false,
      courses: false,
      edit: false,
      exit: false,
    };
    items[name] = true;
    setStyle(items);
    if (name === "dashboard") {
      router.push("/account");
    } else if (name === "exit") {
      document.cookie = ";path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push("/signin");
      window.location.reload();
    } else {
      router.push(`/account/${name}`);
    }
  };
  return (
    <div>
      <div>
        <span>
          <CgProfile />
        </span>
        <span>دانشجو</span>
      </div>
      <div className={styles.operations}>
        <Item
          clickHandler={clickHandler}
          title="داشبورد"
          item="dashboard"
          style={style.dashboard}
        />

        <Item
          clickHandler={clickHandler}
          title="ویرایش اطلاعات"
          item="edit"
          style={style.edit}
        />

        <Item
          clickHandler={clickHandler}
          title="دوره های من"
          item="courses"
          style={style.courses}
        />
        <Item
          clickHandler={clickHandler}
          title="خروج"
          item="exit"
          style={style.exit}
        />
      </div>
    </div>
  );
}

export default Sidebar;
