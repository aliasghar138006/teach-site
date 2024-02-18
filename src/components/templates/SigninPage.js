"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HashPassword } from "@/utils/Operations";

function SigninPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const signinHandler = async () => {
    const res = await fetch(`${url}/account/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    const data = await res.json();
    console.log(data);
    if (data.status == 200) {
      toast.success("ورود با موفقیت انجام شد");
      setTimeout(() => {
        router.push("/account");
      }, 3000);
      const hashedPassword = await HashPassword(password);
      document.cookie = JSON.stringify({
        userName: userName,
        password: hashedPassword,
      });
    } else {
      toast.error(data.message);
    }
  };
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
      <div className={styles.btn} onClick={signinHandler}>
        ورود
      </div>
      <span>
        حساب کاربری ندارید؟ <Link href={"/signup"}>ثبت نام</Link>
      </span>
      <Toaster />
    </div>
  );
}

export default SigninPage;
