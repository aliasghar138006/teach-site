import CoursePage from "@/components/templates/CoursePage";

import { redirect } from "next/navigation";

// export const metadata = {
//   title: "جاوا",
// };

async function page({ params: { courseId } }) {
  const url = process.env.BASE_URL;

  const res = await fetch(`${url}/account/courses/`, {
    next: { revalidate: 5 },
  });

  const data = await res.json(res);

  const course = data.filter((item) => item.id == courseId)[0];
  if (!course) redirect("/");

  return <CoursePage courseData={course} />;
}

export default page;

export const generateMetadata = async ({ params: { courseId } }) => {
  const url = process.env.BASE_URL;

  const res = await fetch(`${url}/account/courses/`, {
    next: { revalidate: 5 },
  });

  const data = await res.json(res);

  const course = data.filter((item) => item.id == courseId)[0];
  return {
    title: course.title,
  };
};
