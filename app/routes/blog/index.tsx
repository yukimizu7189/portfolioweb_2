// ❌ fs と path はCloudflareでは使えないため削除しました！
import matter from "gray-matter";
import { Link } from "react-router";
import type { Route } from "./+types/index";
import FadeIn from "../../components/FadeIn";

// ▼ 1. loader: Viteの機能でフォルダ内のすべてのMarkdownを一括読み込みする
export function loader() {
  // 変更点: import.meta.glob を使って app/posts/ 内の .md をすべて取得
  // ?raw を付けることで、ファイルの中身を「そのままの文字列」として読み込めます
  // eager: true にすることで、ビルド時に自動で全て取得してくれます
  const files = import.meta.glob("../../posts/*.md", { 
    query: "?raw", 
    import: "default", 
    eager: true 
  }) as Record<string, string>;

  // オブジェクトを配列に変換して処理する
  const posts = Object.entries(files).map(([filePath, fileContent]) => {
    // filePath は "../../posts/first-post.md" のような文字列になるので、ファイル名だけを取り出す
    const slug = filePath.split("/").pop()?.replace(/\.md$/, "") || "";
    
    // 文字列として読み込んだMarkdownデータを、今まで通り gray-matter で解析
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

// ▼ 2. 画面の描画
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
        {loaderData.map((post, index) => (
          // 💡 小さな修正: Reactの key は map の直下（一番外側のタグ）に付ける必要があるため、FadeIn に移動しました
          <FadeIn key={post.slug} delay={index * 150}>
            <article 
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