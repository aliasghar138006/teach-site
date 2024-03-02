"use client";
import styles from "@/components/modules/Edit.module.css";
import userDataClient from "@/utils/userDataClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Edit() {
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    profileImage: "",
  });
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const form = new FormData();
  useEffect(() => {
    const getUserData = async () => {
      const data = await userDataClient();
      setData(data);
    };
    getUserData();
  }, []);

  const editHandler = async () => {
    const res = await fetch(`${url}/account/edit/${data.userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.id) {
      toast.success("اطلاعات با موفقیت ویرایش شد");
      window.location.reload();
      router.push("/account");
    } else {
      toast.error("خطایی رخ داده است");
    }
  };

  const changeHandler = async (e) => {
    form.append("image_url", e.target.files[0], e.target.files[0].name);
    const res = await fetch(`${url}/account/editImage/${data.userName}`, {
      method: "POST",

      body: form,

      redirect: "follow",
    });

    const result = await res.json();
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={url.concat(data.profileImage)}
          width={150}
          height={150}
          alt="profile"
        />
        <div>{data.fullName}</div>
      </div>
      <form>
        <div>
          <label htmlFor="fullName">نام و نام خانوادگی:</label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone">شماره تلفن همراه:</label>
          <input
            type="text"
            id="phone"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </div>
        <div>تغییر تصویر پروفایل:</div>
        <input
          id="value"
          accept="image/jpeg,image/png,image/gif"
          type="file"
          name="image_url"
          onChange={changeHandler}
        />
        <div className={styles.btn} onClick={editHandler}>
          ذخیره اطلاعات
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Edit;
