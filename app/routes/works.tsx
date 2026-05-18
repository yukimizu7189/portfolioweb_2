import worksJson from "../data/works.json";
import { useState } from "react"; 
import type { Route } from "./+types/works";
import FadeIn from "../components/FadeIn";

type WorkItem = {
  id: string;
  type: "Photo" | "Video" | "Design" | "Cosplay_photo";
  title?: string;
  imageUrl?: string;
  link?: string;
  description?: string;
  tweetUrl?: string;
  date: string;
};

export async function loader() {
  const rawWorksData = worksJson as WorkItem[];

  const worksData = await Promise.all(
    rawWorksData.map(async (work) => {
      if (work.tweetUrl) {
        try {
          const cleanUrl = work.tweetUrl.split("?")[0];
          const parsedUrl = new URL(cleanUrl);
          parsedUrl.hostname = "api.fxtwitter.com";
          const apiUrl = parsedUrl.toString();

          const response = await fetch(apiUrl, {
            headers: {"User-Agent": "YukimizuPortfolio/2.0 (+https://portfolio.yukidokemizu.com)",
            },
          });
          
          if (response.ok) {
            const apiData = await response.json();
            const text = apiData.tweet?.text;
            const fetchedImage = apiData.tweet?.media?.photos?.[0]?.url;

            return {
              ...work,
              title: work.title || ``,
              description: text || work.description,
              imageUrl: fetchedImage || work.imageUrl,
              link: cleanUrl,
            };
          }
        } catch (error) {
          console.error("[通信エラー] ツイートの取得に失敗しました:", error);
        }
      }
      return work;
    })
  );

  worksData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return worksData;
}

export function meta({}: Route.MetaArgs) {
  const siteTitle = "works | yukimizu Portfolio ";
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
    { name: "twitter:card", content: "summary_large_image" }, 
    { name: "twitter:site", content: "@yukimizu7189" }, 
    { name: "twitter:title", content: siteTitle },
    { name: "twitter:description", content: siteDescription },
    { name: "twitter:image", content: imageUrl },
    { title: "works | yukimizu Portfolio" }
  ];
}

export default function Works({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Photo", "Video", "Design", "Cosplay_photo"];

  const filteredWorks = loaderData.filter((work) => {
    if (selectedCategory === "All") return true; // Allなら全て表示
    return work.type === selectedCategory;       // それ以外は一致するものだけ残す
  });

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-16">

      <header className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter flex items-center gap-6">
          Works
          <span className="h-[3px] flex-grow max-w-[200px] bg-accent-500" style={{ backgroundColor: '#ff007f' }}></span>
        </h1>
        <p className="text-gray-400 font-bold text-lg uppercase tracking-[0.3em]">
          Creative Archive / {selectedCategory === "All" ? "Everything" : selectedCategory}
        </p>
      </header>

      <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 text-xs font-black tracking-widest uppercase transition-all duration-300 border-2 ${
              selectedCategory === category
                ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(255,0,127,1)]" 
                : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black" 
            }`}
          >
            {category.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
        {filteredWorks.map((work, index) => {
          const CardWrapper = work.link ? "a" : "div";
          const wrapperProps = work.link ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : {};

          return (
            <FadeIn key={work.id} delay={index * 50}>
              <CardWrapper
                key={work.id}
                {...wrapperProps}
                className={`break-inside-avoid mb-10 group block relative bg-white transition-all duration-500 ${
                  work.link ? "cursor-pointer" : ""
                }`}
              >
                <div className="relative overflow-hidden bg-gray-50 border border-gray-50">
                  {work.imageUrl && (
                    <img 
                      src={work.imageUrl} 
                      alt={work.title} 
                      className="w-full h-auto block transition-all duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

                  {/* Category Tag on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white text-[10px] font-black tracking-[0.2em] uppercase text-black border border-black/10">
                      {work.type.replace("_", " ")}
                    </span>
                  </div>

                  {work.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3 px-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                    <span>{work.date}</span>
                  </div>

                  {work.title && (
                    <h3 className="text-2xl font-black text-black group-hover:text-accent-500 transition-colors tracking-tight leading-tight uppercase">
                      {work.title}
                    </h3>
                  )}

                  {work.description && (
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {work.description}
                    </p>
                  )}
                </div>
              </CardWrapper>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
  }