"use client";

import styles from "@/components/templates/Course.module.css";
import CheckAuth from "@/utils/CheckAuth";
import { e2p, sp } from "@/utils/Operations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

function CoursePage({ courseData }) {
  const [video, setVideo] = useState(courseData.videos[0]);

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
    };
    Authuntication();
  }, []);

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
          <button>افزودن به دوره های من</button>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
