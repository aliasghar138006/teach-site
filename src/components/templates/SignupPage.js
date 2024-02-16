"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";

function SignupPage() {
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
      <div className={styles.btn}>ثبت نام</div>
      <span>
        حساب کاربری دارید؟ <Link href={"/signin"}>ورود</Link>
      </span>
    </div>
  );
}

export default SignupPage;
