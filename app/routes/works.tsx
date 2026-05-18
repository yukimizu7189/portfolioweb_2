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
  return [{ title: "Works | yukimizu Portfolio" }];
}

export default function Works({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Photo", "Video", "Design", "Cosplay_photo"];

  const filteredWorks = loaderData.filter((work) => {
    if (selectedCategory === "All") return true; // Allなら全て表示
    return work.type === selectedCategory;       // それ以外は一致するものだけ残す
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      <header className="border-b pb-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Works</h1>
        <p className="mt-2 text-gray-300 text-lg">写真、映像、デザイン、コスプレなど</p>
      </header>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-md" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200" 
            }`}
          >
            {category.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
        
        {filteredWorks.map((work, index) => {
          const CardWrapper = work.link ? "a" : "div";
          const wrapperProps = work.link ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : {};

          return (
            <FadeIn key={work.id} delay={index * 150}>
              <CardWrapper
                key={work.id}
                {...wrapperProps}
                className={`break-inside-avoid mb-6 group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${
                  work.link ? "hover:border-blue-200 hover:shadow-md cursor-pointer" : ""
                }`}
              >
                
                {work.imageUrl && (
                  <div className="relative bg-gray-100 overflow-hidden">
                    <img 
                      src={work.imageUrl} 
                      alt={work.title} 
                      className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                    />
                    {work.type === "Video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <svg className="w-12 h-12 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                      {work.type.replace("_", " ")}
                    </span>
                    <time className="text-xs text-gray-400">{work.date}</time>
                  </div>
                  
                  {work.title && (
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {work.title}
                    </h3>
                  )}

                  {work.description && (
                    <p className="text-sm text-gray-700 leading-relaxed mt-2 line-clamp-3">
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