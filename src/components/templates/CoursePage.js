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
import TitleBox from "../modules/TitleBox";
import { Player } from "video-react";

function CoursePage({ courseData }) {
  const [video, setVideo] = useState(courseData.videos[0]);
  const [userData, setUserData] = useState({});
  const [add, setAdd] = useState(true);
  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

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
      setUserData(userInfo);
      const course = userInfo.courses.filter(
        (item) => item.id === courseData.id
      );

      if (course.length) {
        setAdd(false);
      }
    };
    Authuntication();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`${url}/comments/`);
      const data = await res.json();
      const filterData = data.filter((item) => item.course === courseData.id);
      setComments(filterData);
    };
    getComments();
  }, [addComment]);

  const addHandler = async () => {
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

  const sendHandler = async () => {
    if (!comment) {
      toast.error("لطفا فیلد را پر نمایید");
      return;
    }
    const res = await fetch(`${url}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: comment,
        course: courseData.id,
        user: userData.id,
      }),
    });

    const data = await res.json();
    if (data.id) {
      toast.success("نظر شما با موفقیت اضافه شد");
      setComment("");
      setAddComment(false);
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
          {/* <video controls src={url.concat(video.video)} /> */}
          <Player playsInline poster="" src={url.concat(video.video)} />
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
      <div className={styles.addComment}>
        <button onClick={() => setAddComment(true)}>افزودن نظر</button>
        {addComment && (
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={sendHandler}>ارسال نظر</button>
          </div>
        )}
      </div>

      <div className={styles.comments}>
        <TitleBox title="نظرات کاربران" seeAll={false} />
        {comments.map((item, index) => (
          <div className={styles.comment} key={index}>
            <div>
              <div>{userData.userName}</div>
              <div>{new Date(item.createdAt).toLocaleDateString("fa-IR")}</div>
            </div>
            <span className={styles.message}>{item.message}</span>
          </div>
        ))}
      </div>

      <Toaster />
    </div>
  );
}

export default CoursePage;
