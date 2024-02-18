"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const router = useRouter();

  const signupHandler = async () => {
    const res = await fetch("http://127.0.0.1:8000/account/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
        role,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.id) {
      toast.success("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
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
      <div className={styles.role}>
        <input
          type="checkbox"
          value={"teacher"}
          onChange={(e) => {
            e.target.checked ? setRole(e.target.value) : setRole("user");
          }}
        />
        <span>ثبت نام به عنوان مدرس</span>
      </div>
      <div className={styles.btn} onClick={signupHandler}>
        ثبت نام
      </div>
      <span>
        حساب کاربری دارید؟ <Link href={"/signin"}>ورود</Link>
      </span>
      <Toaster />
    </div>
  );
}

export default SignupPage;
