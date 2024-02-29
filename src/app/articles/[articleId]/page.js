import ArticlePage from "@/components/templates/ArticlePage";
import { redirect } from "next/navigation";

async function page({ params: { articleId } }) {
  const url = process.env.BASE_URL;
  const articleRes = await fetch(`${url}/articles/`, {
    next: { revalidate: 5 },
  });

  const data = await articleRes.json();
  const articleData = data.filter((item) => item.id == articleId)[0];
  if (!articleData) redirect("/");
  return <ArticlePage articleData={articleData} />;
}

export default page;
