"use client";

import styles from "@/components/modules/Add.module.css";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Add({ userData }) {
  const [data, setData] = useState({
    title: "",
    image: "",
    price: "",
    teacher: userData.fullName || userData.userName,
    time: "",
    description: "",
  });
  const [video, setVideo] = useState([]);
  const [videosId, setVideosId] = useState([]);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const form = new FormData();
  const videoForm = new FormData();
  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "teacher") {
      return;
    } else if (name !== "image") {
      setData({ ...data, [name]: value });
    } else {
      setData({ ...data, [name]: files[0] });
    }
  };

  const addHandler = () => {
    setVideo([...video, { title: "", video: "", enable: true }]);
  };

  const deleteHandler = (index) => {
    const newData = [...video];
    newData.splice(index, 1);
    setVideo(newData);
    videosId.splice(index, 1);
  };

  const sectionChangeHandler = async (e, index) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      const newData = [...video];
      newData[index].video = files[0];
      setVideo(newData);
    } else {
      const newData = [...video];
      newData[index].title = value;
      setVideo(newData);
    }
  };

  const uploadHandler = async (index) => {
    videoForm.append("title", video[index].title);
    videoForm.append("video", video[index].video);
    const res = await fetch(`${url}/account/courses/video/`, {
      method: "POST",
      body: videoForm,
    });

    const result = await res.json();
    if (result.id) {
      setVideosId([...videosId, result.id]);
      const newData = [...video];
      newData[index].enable = false;
      setVideo(newData);
    } else {
      toast.error("خطایی رخ داده است");
    }
  };
  const sendHandler = async () => {
    const { title, image, price, teacher, time, description } = data;
    if (!title || !image || !price || !teacher || !time || !description) {
      toast.error("لطفا فیلد ها را پر کنید");
      return;
    }
    form.append("image", data.image);
    form.append("title", data.title);
    form.append("price", data.price);
    form.append("teacher", data.teacher);
    form.append("time", data.time);
    form.append("description", data.description);
    form.append("videos", JSON.stringify(videosId));

    const res = await fetch(`${url}/account/courses/`, {
      method: "POST",
      body: form,
    });

    const result = await res.json();
    if (result.id) {
      toast.success("ارسال شد");
      window.location.reload();
    } else {
      toast.error("خطایی رخ داده است");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.right}>
          <h3>افرودن دوره</h3>
          <div>
            <label htmlFor="title">عنوان دوره:</label>
            <input
              id="title"
              type="text"
              value={data.title}
              name="title"
              onChange={changeHandler}
            />
          </div>

          <div>
            <label htmlFor="image">تصویر دوره:</label>
            <input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              name="image"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="price">مبلغ دوره:</label>
            <input
              id="price"
              type="text"
              name="price"
              value={data.price}
              onChange={changeHandler}
            />
          </div>

          <div>
            <label htmlFor="teacher">مدرس دوره:</label>
            <input
              id="teacher"
              type="text"
              name="teacher"
              disabled={true}
              value={data.teacher}
              onChange={changeHandler}
            />
          </div>

          <div>
            <label htmlFor="time">مدت زمان دوره:</label>
            <input
              id="time"
              type="text"
              name="time"
              value={data.time}
              onChange={changeHandler}
            />
          </div>

          <div>
            <label htmlFor="description">توضیحات دوره:</label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className={styles.left}>
          <button onClick={addHandler}>افرودن قسمت جدید</button>
          {video.map((item, index) => (
            <div key={index}>
              {item.enable ? (
                <div>
                  <label htmlFor="titleSection">عنوان:</label>
                  <input
                    id="titleSection"
                    type="text"
                    value={item.title}
                    onChange={(e) => sectionChangeHandler(e, index)}
                  />
                  <label htmlFor="video">ویدیو:</label>
                  <input
                    id="video"
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={(e) => sectionChangeHandler(e, index)}
                  />
                  <div className={styles.operations}>
                    <button onClick={() => deleteHandler(index)}>حذف</button>
                    <button onClick={() => uploadHandler(index)}>آپلود</button>
                  </div>
                </div>
              ) : (
                <div className={styles.upload}>
                  <button disabled={true}>ویدیو آپلود شد</button>
                  <span>
                    <IoCheckmarkDoneCircle />
                  </span>
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>

      <button className={styles.send} onClick={sendHandler}>
        ارسال
      </button>
      <Toaster />
    </div>
  );
}

export default Add;
