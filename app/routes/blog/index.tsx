import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Link } from "react-router";
import type { Route } from "./+types/index";
import FadeIn from "../../components/FadeIn";

// ▼ 1. loader: フォルダ内のすべてのMarkdownを読み込んでリスト化する
export function loader() {
  const postsDirectory = path.join(process.cwd(), "app/posts");
  
  // フォルダの中にあるファイル名をすべて取得 (例: ["first-post.md", "second-post.md"])
  const filenames = fs.readdirSync(postsDirectory);

  // ファイル名の配列を、記事データの配列に変換する
  const posts = filenames
    .filter((filename) => filename.endsWith(".md")) // .mdファイルだけを対象にする
    .map((filename) => {
      // ファイル名から拡張子(.md)を取り除いて slug を作る
      const slug = filename.replace(/\.md$/, "");
      
      // ファイルの中身を読み込んで、gray-matterでメタデータを取り出す
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: slug,
        title: data.title,
        date: data.date,
      };
    });

  // 日付が新しい順（降順）に並べ替える
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Blog | yukimizu Portfolio" }];
}

// ▼ 2. 画面の描画: loaderから受け取った記事の配列(loaderData)を展開する
export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <FadeIn>
        <header className="border-b pb-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Blog</h1>
          <p className="mt-2 text-gray-300 text-lg">技術の学びや日常の記録</p>
        </header>
      </FadeIn>

      <div className="grid gap-6">
        {/* JavaScriptの map関数 で配列の中身を1つずつHTMLに変換する */}
        {loaderData.map((post, index) => (
          <FadeIn delay={index * 150}>
          <article 
            key={post.slug} 
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
          >
            <Link to={`/blog/${post.slug}`} className="block">
              <time className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                {post.date}
              </time>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
          </article>
          </FadeIn>
        ))}
      </div>

    </div>
  );
}