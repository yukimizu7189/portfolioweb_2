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

      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="flex-1 text-left space-y-8">
              <h1 className="text-6xl md:text-8xl font-light text-black tracking-tighter leading-[0.9] uppercase">
                Hello, <br />
                I'm <span className="font-black italic text-accent-500" style={{ color: '#ff007f' }}>yukimizu</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl leading-relaxed">
                メディアコンテンツと同人文化に生きる人
              </p>
              <div className="pt-4 flex gap-6">
                <Link to="/works" className="group relative px-8 py-3 bg-black text-white overflow-hidden transition-all hover:bg-accent-500">
                  <span className="relative z-10 font-bold tracking-widest text-sm">VIEW WORKS</span>
                </Link>
                <Link to="/profile" className="group relative px-8 py-3 border border-black text-black overflow-hidden transition-all hover:bg-black hover:text-white">
                  <span className="relative z-10 font-bold tracking-widest text-sm">ABOUT ME</span>
                </Link>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative group">
              <div className="absolute inset-0 border-2 border-black rotate-3 group-hover:rotate-6 transition-transform"></div>
              <div className="absolute inset-0 border-2 border-accent-500 -rotate-3 group-hover:-rotate-6 transition-transform" style={{ borderColor: '#ff007f' }}></div>
              <div className="relative z-10 w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src="/yukimizu_real.jpg" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter flex items-center gap-4">
                Works
                <span className="h-[2px] w-24 bg-accent-500" style={{ backgroundColor: '#ff007f' }}></span>
              </h2>
              <p className="text-gray-400 font-medium text-lg uppercase tracking-widest">Recent Creation</p>
            </div>
            <Link to="/works" className="group flex items-center gap-2 text-sm font-black tracking-widest uppercase hover:text-accent-500 transition-colors">
              Explore All
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loaderData.map((work, index) => {
            const CardWrapper = work.link ? "a" : "div";
            const wrapperProps = work.link ? { href: work.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <FadeIn key={work.id} delay={index * 100}>
                <CardWrapper
                  key={work.id}
                  {...wrapperProps}
                  className={`group block relative bg-white transition-all duration-500 ${
                    work.link ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-100">
                    {work.imageUrl && (
                      <img 
                        src={work.imageUrl} 
                        alt={work.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-[10px] font-black tracking-[0.2em] uppercase text-black border border-black/10">
                        {work.type.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      <span>{work.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black group-hover:text-accent-500 transition-colors leading-tight">
                      {work.title}
                    </h3>
                    {work.description && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mt-2">
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
        <FadeIn>
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter flex items-center gap-4">
                Banners
                <span className="h-[2px] w-24 bg-accent-500" style={{ backgroundColor: '#ff007f' }}></span>
              </h2>
              <p className="text-gray-400 font-medium text-lg uppercase tracking-widest">リンク先と本サイトは無関係です</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          <FadeIn delay={100}>
            <a href="https://love.tsukuba-ac.net/" target="_blank" rel="noreferrer" 
               className="group block bg-white border-2 border-black p-6 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              <div className="flex flex-col items-center gap-4">
                <img src="https://love.tsukuba-ac.net/tsukuba-love1.png" className='grayscale group-hover:grayscale-0 transition-all' width="200" height="40" alt="つくば大好き連合"></img>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">つくば大好き連合</span>
              </div>
            </a>
          </FadeIn>

          <FadeIn delay={200}>
            <a href="https://sites.google.com/view/happy-busy/" target="_blank" rel="noreferrer"
               className="group block bg-white border-2 border-black p-6 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              <div className="flex flex-col items-center gap-4">
                <img src="unnamed.png" className='grayscale group-hover:grayscale-0 transition-all' width="200" height="40" alt="時間のないサイト運営者リング"></img>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">時間のないサイト運営者リング</span>
              </div>
            </a>
          </FadeIn>

          <FadeIn delay={300}>
            <a href="http://www.comiket.co.jp/" target="_blank" rel="noreferrer"
               className="group block bg-white border-2 border-black p-6 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              <div className="flex flex-col items-center gap-4">
                <img src="http://www.comiket.co.jp/images/comiket_banner00.gif" width="200" height="40" alt="コミックマーケット公式サイト" className='grayscale group-hover:grayscale-0 transition-all'></img>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-black transition-colors">Comic Market</span>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}