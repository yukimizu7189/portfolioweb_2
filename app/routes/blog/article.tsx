import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/article";

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;

  try {

    const filePath = path.join(process.cwd(), "app/posts", `${slug}.md`);

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    return {
      title: data.title,
      date: data.date,
      content: content,
    };
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.title} | My Portfolio` }];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    <article className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      
      <header className="border-b pb-4 mb-8">
        <h1 className="text-3xl font-bold mb-2">{loaderData.title}</h1>
        <p className="text-gray-500">{loaderData.date}</p>
      </header>

      <div className="prose max-w-none text-gray-800">
        <ReactMarkdown>{loaderData.content}</ReactMarkdown>
      </div>
      
    </article>
  );
}