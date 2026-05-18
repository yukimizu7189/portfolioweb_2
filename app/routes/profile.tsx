import type { Route } from "./+types/profile";
import FadeIn from "../components/FadeIn";

export function meta({}: Route.MetaArgs) {
  const siteTitle = "profile | yukimizu Portfolio ";
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
    { title: "profile | yukimizu Portfolio" }
  ];
}

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-24">

      {/* ▼ 1. ヘッダー＆基本情報エリア */}
      <section className="space-y-12">
        <FadeIn delay={0}>
          <header className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter flex items-center gap-6">
              Profile
              <span className="h-[3px] flex-grow max-w-[200px] bg-accent-500" style={{ backgroundColor: '#ff007f' }}></span>
            </h1>
            <p className="text-gray-400 font-bold text-lg uppercase tracking-[0.3em]">About / Identity</p>
          </header>

          <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(255,0,127,0.1)] mt-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

              
              <div className="w-32 h-32 flex-shrink-0">
                <img 
                  src="/icon.jpg" 
                  alt="yukimizu" 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter">yukimizu</h2>
                  <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">筑波大学 情報学群 情報メディア創成学類</p>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium text-lg">
                  神奈川県横浜市在住の大学生<br />
                  メディアコンテンツ、同人文化をこよなく愛する。<br />
                  主に写真、映像、デザインなどの創作活動を行っている。
                </p>
              </div>
              </div>
              </div>
              </FadeIn>
              </section>

              {/* ▼ 2. 所属組織セクション */}
              <section className="space-y-12">
              <FadeIn delay={150}>
              <div className="space-y-2">
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter">所属組織</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest">Activities & Organizations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            <a 
              href="https://sohosai.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="group block bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-accent-500 transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">学園祭実行委員会</h3>
              </div>
              <p className="text-sm font-black tracking-widest text-accent-500 group-hover:text-white uppercase mb-2">jsys24-25</p>
              <p className="text-sm font-medium opacity-70 leading-relaxed">jsys25 映像部門 制作担当長<br />(元) 情報メディアシステム局</p>
            </a>

            <a 
              href="https://gsk-tsukuba.net/" 
              target="_blank" 
              rel="noreferrer" 
              className="group block bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-accent-500 transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">現代視覚文化研究会</h3>
              </div>
              <p className="text-sm font-black tracking-widest text-accent-500 group-hover:text-white uppercase mb-2">コスプレ班 元班長</p>
              <p className="text-sm font-medium opacity-70 leading-relaxed">コスプレ・写真撮影活動</p>
            </a>

            <a 
              href="https://www.comic-tsukuba.com/" 
              target="_blank" 
              rel="noreferrer" 
              className="group block bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-accent-500 transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">コミックつくば！</h3>
              </div>
              <p className="text-sm font-black tracking-widest text-accent-500 group-hover:text-white uppercase mb-2">準備会</p>
              <p className="text-sm font-medium opacity-70 leading-relaxed">設立・総合業務・情シス・デザインなど</p>
            </a>

            <a 
              href="https://www.word-ac.net/" 
              target="_blank" 
              rel="noreferrer" 
              className="group block bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-accent-500 transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">WORD編集部</h3>
              </div>
              <p className="text-sm font-black tracking-widest text-accent-500 group-hover:text-white uppercase mb-2">筑波大学学類誌</p>
              <p className="text-sm font-medium opacity-70 leading-relaxed">執筆・編集・DTP活動</p>
            </a>

            <a 
              href="" 
              target="_blank" 
              rel="noreferrer" 
              className="group block bg-white p-8 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(255,0,127,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-accent-500 transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-white transition-colors">re:master-LT</h3>
              </div>
              <p className="text-sm font-black tracking-widest text-accent-500 group-hover:text-white uppercase mb-2">設立・主催</p>
              <p className="text-sm font-medium opacity-70 leading-relaxed">情報メディア&芸術のライトニングトーク会</p>
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}