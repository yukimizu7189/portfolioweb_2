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
  const siteTitle = "Blog | yukimizu Portfolio ";
  const siteDescription = "yukimizuのポートフォリオサイトです。";
  const siteUrl = "https://portfolio.yukidokemizu.com";
  const imageUrl = `${siteUrl}/icon.jpg`;

  return [
    { title: siteTitle },
    { name: "description", content: siteDescription },

    { property: "og:title", content: siteTitle },
    { property: "og:description", content: siteDescription },
    { property: "og:type", content: "website" }, 
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: imageUrl },

    //X専用の設定
    { name: "twitter:card", content: "summary" }, 
    { name: "twitter:site", content: "@yukimizu7189" }, 
    { name: "twitter:title", content: siteTitle },
    { name: "twitter:description", content: siteDescription },
    { name: "twitter:image", content: imageUrl },
    { title: "Blog | yukimizu Portfolio" }
  ];
}

// ▼ 2. 画面の描画
export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-16">
      <FadeIn>
        <header className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter flex items-center gap-6">
            Blog
            <span className="h-[3px] flex-grow max-w-[200px] bg-accent-500" style={{ backgroundColor: '#ff007f' }}></span>
          </h1>
          <p className="text-gray-400 font-bold text-lg uppercase tracking-[0.3em]">Thoughts & Notes</p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loaderData.map((post, index) => (
          <FadeIn key={post.slug} delay={index * 150}>
            <article 
              className="group bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <Link to={`/blog/${post.slug}`} className="block space-y-4">
                <time className="text-xs font-black tracking-widest text-accent-500 uppercase group-hover:text-white transition-colors">
                  {post.date}
                </time>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-tight transition-colors">
                  {post.title}
                </h2>
                <div className="pt-4">
                  <span className="text-sm font-black tracking-widest uppercase border-b-2 border-current">Read More →</span>
                </div>
              </Link>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
  }