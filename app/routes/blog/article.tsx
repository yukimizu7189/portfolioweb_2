import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import type { Route } from "./+types/article";

export async function loader({ params }: Route.LoaderArgs) {
  const files = import.meta.glob("../../posts/*.md", { 
    query: "?raw", 
    import: "default", 
    eager: true 
  }) as Record<string, string>;

  const targetPath = `../../posts/${params.slug}.md`;
  const fileContent = files[targetPath];

  if (!fileContent) {
    throw new Response("Not Found", { status: 404 });
  }

  const { data, content } = matter(fileContent);

  return {
    title: data.title,
    date: data.date,
    content: content,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const siteTitle = `${data?.title} | yukimizu Blog`;
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
    { title: `${data?.title} | yukimizu Blog` }
  ];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">

        {/* ▼ 1. ブログ一覧に戻るリンク */}
        <div className="mb-12">
          <Link 
            to="/blog" 
            className="group inline-flex items-center text-sm font-black tracking-widest text-black uppercase hover:text-accent-500 transition-colors"
          >
            <svg className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Index
          </Link>
        </div>

        <article className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,0,127,0.1)] overflow-hidden">

          {/* ▼ 2. 記事のヘッダー部分 */}
          <header className="bg-black px-8 py-16 text-center">
            <time className="text-sm font-black tracking-[0.3em] text-accent-500 uppercase">
              {loaderData.date}
            </time>
            <h1 className="mt-6 text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              {loaderData.title}
            </h1>
          </header>

          {/* ▼ 3. 記事の本文 (Markdown) */}
          <div className="px-8 py-16 sm:px-16">
            <div className="prose prose-pink prose-xl max-w-none text-gray-800 mx-auto font-medium leading-relaxed">
              <ReactMarkdown>{loaderData.content}</ReactMarkdown>
            </div>
          </div>
        </article>

      </div>
    );
    }