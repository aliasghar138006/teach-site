"use client";
import styles from "@/components/templates/Account.module.css";
import Item from "../elements/Item";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useRouter as routerData } from "next/router";
import userDataClient from "@/utils/userDataClient";

function Sidebar() {
  const [role, setRole] = useState("user");
  const [style, setStyle] = useState({
    dashboard: true,
    myCourse: false,
    edit: false,
    exit: false,
    add: false,
  });

  const router = useRouter();
  useEffect(() => {
    if (style.dashboard) {
      router.push("/account");
    }
    const getData = async () => {
      const { role } = await userDataClient();
      setRole(role);
    };

    getData();
  }, []);

  const clickHandler = (name) => {
    console.log(routerData.pathname);
    const items = {
      dashboard: false,
      courses: false,
      edit: false,
      exit: false,
      add: false,
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

        {role === "teacher" && (
          <Item
            clickHandler={clickHandler}
            title="افزودن دوره"
            item="add"
            style={style.add}
          />
        )}

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
