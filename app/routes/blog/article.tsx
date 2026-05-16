import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router"; // ← 追加: 戻るリンク用
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
  return [{ title: `${data?.title} | yukimizu Blog` }];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    // 記事全体のコンテナ: 読みやすい最大幅(max-w-3xl)を設定し、中央寄せ
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      {/* ▼ 1. ブログ一覧に戻るリンク */}
      <div className="mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>

      <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* ▼ 2. 記事のヘッダー部分 */}
        <header className="bg-gray-50 px-8 py-10 border-b border-gray-100 text-center">
          <time className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
            {loaderData.date}
          </time>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl leading-tight">
            {loaderData.title}
          </h1>
        </header>

        {/* ▼ 3. 記事の本文エリア */}
        <div className="px-8 py-10 sm:px-12">
          {/* 
            prose: Tailwind Typographyの基本クラス 
            prose-blue: リンクなどのアクセントカラーを青に
            prose-lg: 文字を少し大きめに（読みやすく）
            max-w-none: 横幅制限を解除して親要素の幅に合わせる
            mx-auto: 中央寄せ
          */}
          <div className="prose prose-blue prose-lg max-w-none text-gray-700 mx-auto">
            <ReactMarkdown>{loaderData.content}</ReactMarkdown>
          </div>
        </div>
        
      </article>
      
    </div>
  );
}