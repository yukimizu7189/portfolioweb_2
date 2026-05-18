import worksJson from "../data/works.json";
import { Link } from "react-router";
import type { Route } from "./+types/home.tsx"; // ※ファイル名に合わせてください
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

  // 日付が新しい順（降順）に並べ替える
  worksData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return worksData.slice(0, 3);
}

export function meta({}: Route.MetaArgs) {
  const siteTitle = "Portfolio | yukimizu ";
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
    { title: "yukimizu | Portfolio" }
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-32 pb-24">

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tight mb-6">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-pink-400 to-black" style={{ backgroundImage: 'linear-gradient(to right, #ff1a6d, #f472b6, #000000)' }}>yukimizu</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            メディアコンテンツと同人文化に生きる人<br />
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/works" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg border border-black">
              View Works
            </Link>
            <Link to="/profile" className="bg-white text-black border border-gray-200 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm">
              About Me
            </Link>
          </div>
          </FadeIn>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <FadeIn>
          <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-bold text-black uppercase tracking-tighter">Works</h2>
              <p className="text-gray-500 mt-1 font-medium">新着作例</p>
            </div>
            <Link to="/works" className="text-accent-600 font-bold hover:text-accent-500 transition-colors" style={{ color: '#ff1a6d' }}>
              View All →
            </Link>
          </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loaderData.map((work, index) => {
            const CardWrapper = work.link ? "a" : "div";
            const wrapperProps = work.link ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <FadeIn key={work.id} delay={index * 100}>
                <CardWrapper
                  key={work.id}
                  {...wrapperProps}
                  className={`group flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${
                    work.link ? "hover:border-accent-200 hover:shadow-md cursor-pointer" : ""
                  }`}
                >

                  {work.imageUrl && (
                    <div className="relative aspect-video bg-gray-100 overflow-hidden shrink-0">
                      <img 
                        src={work.imageUrl} 
                        alt={work.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <span className="text-xs font-bold tracking-wider text-accent-600 uppercase" style={{ color: '#ff1a6d' }}>
                        {work.type.replace("_", " ")}
                      </span>
                      <time className="text-xs text-gray-400">{work.date}</time>
                    </div>

                    {work.title && (
                      <h3 className="text-lg font-bold text-black group-hover:text-accent-600 transition-colors">
                        {work.title}
                      </h3>
                    )}
                    {work.description && (
                      <p className="text-sm text-gray-700 leading-relaxed mt-2 line-clamp-2">
                        {work.description}
                      </p>
                    )}


                  </div>
                </CardWrapper>
              </FadeIn>

            );
          })}
        </div>

      </section>

      <section className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'> 
        <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
          <div>
            <h2 className="text-3xl font-bold text-black uppercase tracking-tighter">Banner</h2>
            <p className="text-gray-500 mt-1 font-medium">リンク先と私は無関係です</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 justify-items-center">
          <a href="https://love.tsukuba-ac.net/" target="_blank" rel="noreferrer" className="inline-block hover:scale-105 transition-transform">
            <img src="https://love.tsukuba-ac.net/tsukuba-love1.png" className='grayscale hover:grayscale-0 transition-all shadow-sm' width = "200" height = "40" alt="つくば大好き連合"></img>
          </a>
          <a href="https://sites.google.com/view/happy-busy/" target="_blank" rel="noreferrer" className="inline-block hover:scale-105 transition-transform">
            <img src="unnamed.png" className='grayscale hover:grayscale-0 transition-all shadow-sm' width = "200" height = "40" alt="時間のないサイト運営者リング"></img>
          </a>
          <a href="http://www.comiket.co.jp/" target="_blank" rel="noreferrer" className="inline-block hover:scale-105 transition-transform">
            <img src="http://www.comiket.co.jp/images/comiket_banner00.gif" width="200" height="40" alt="コミックマーケット公式サイト" className='grayscale hover:grayscale-0 transition-all shadow-sm'></img>
          </a>
        </div>
      </section>

    </div>
  );
}