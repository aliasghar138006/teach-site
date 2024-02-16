"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";

function SigninPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="userName">نام کاربری</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">کلمه عبور</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.btn}>ورود</div>
      <span>
        حساب کاربری ندارید؟ <Link href={"/signup"}>ثبت نام</Link>
      </span>
    </div>
  );
}

export default SigninPage;
