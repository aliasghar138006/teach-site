"use client";

import styles from "@/components/templates/Course.module.css";
import CheckAuth from "@/utils/CheckAuth";
import { e2p, sp } from "@/utils/Operations";
import userDataClient from "@/utils/userDataClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

function CoursePage({ courseData }) {
  const [video, setVideo] = useState(courseData.videos[0]);
  const [add, setAdd] = useState(true);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const array = [];
  for (let i = 0; i < courseData.score; i++) {
    array.push(i);
  }

  const router = useRouter();

  useEffect(() => {
    const Authuntication = async () => {
      const auth = await CheckAuth();
      if (!auth) {
        router.push("/signin");
      }
      const userInfo = await userDataClient();
      const course = userInfo.courses.filter(
        (item) => item.id === courseData.id
      );

      if (course.length) {
        setAdd(false);
      }
    };
    Authuntication();
  }, []);

  const addHandler = async () => {
    const userData = await userDataClient();
    const res = await fetch(`${url}/account/courses/add/${userData.userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: courseData.id }),
    });
    const data = await res.json();
    if (data.id) {
      toast.success("دوره با موفقیت اضافه شد");
      router.push("/account");
    } else {
      toast.error("خطایی رخ داده است");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{courseData.title}</h1>
      <div className={styles.main}>
        <div className={styles.right}>
          <h3>{video.title}</h3>
          <video controls src={url.concat(video.video)} />
          <div>توضیحات دوره:</div>
          <p>{courseData.description}</p>

          <div>سرفصل ها:</div>
          {courseData.videos.map((item, index) => (
            <div key={index}>
              <div
                className={styles.section}
                onClick={() => {
                  setVideo(item);
                  window.scrollTo({ top: 200, left: 0, behavior: "smooth" });
                }}
              >
                {item.title}
                <FaPlay />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.left}>
          <Image
            src={`${url.concat(courseData.image)}`}
            width={300}
            height={200}
            alt="course"
          />
          <div className={styles.details}>
            <span>مدرس دوره:</span>
            <span>{courseData.teacher}</span>
          </div>

          <div className={styles.details}>
            <span>مدت زمان دوره:</span>
            <span>{e2p(courseData.time)}</span>
          </div>

          <div className={styles.details}>
            <span>امتیاز دوره:</span>

            <span className={styles.score}>
              {array.map((item) => (
                <FaStar key={item} />
              ))}
            </span>
          </div>
          {add ? (
            <button onClick={addHandler}>افزودن به دوره های من</button>
          ) : (
            <Link href={"/account"}>
              <button>رفتن به داشبورد</button>
            </Link>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default CoursePage;
