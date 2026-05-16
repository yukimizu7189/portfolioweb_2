import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Profile | yukimizu Portfolio" }];
}

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* ▼ 1. ヘッダー＆基本情報エリア */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">Profile</h1>
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 inline-block text-left w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            <div className="w-32 h-32 flex-shrink-0">
              <img 
                src="../../yukimizu_real.jpg" 
                alt="yukimizu" 
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">yukimizu</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">筑波大学 情報学群 情報メディア創成学類</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                神奈川県横浜市在住の大学生<br />
                大学内外を問わず様々な組織に所属し、写真・デザイン・情シス・コスプレ・即売会など、興味のある分野で幅広く活動しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ▼ 2. 所属組織エリア */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">所属組織</h2>
          <p className="text-gray-500 mt-2">Activities & Organizations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <a 
            href="https://sohosai.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">学園祭実行委員会</h3>
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">(元) 情報メディアシステム局 (jsys24-25)</p>
            <p className="text-sm text-gray-600">jsys25 映像部門 制作担当長</p>
          </a>

          <a 
            href="https://gsk-tsukuba.net/" 
            target="_blank" 
            rel="noreferrer" 
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-500 transition-colors">現代視覚文化研究会</h3>
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">コスプレ班 元班長</p>
            <p className="text-sm text-gray-600">コスプレ・写真撮影活動</p>
          </a>

          <a 
            href="https://www.comic-tsukuba.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-sky-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-500 transition-colors">コミックつくば！準備会</h3>
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">設立・総合業務・情シス・デザインなど</p>
            <p className="text-sm text-gray-600">筑波大学内同人誌即売会</p>
          </a>

          <a 
            href="https://www.word-ac.net/" 
            target="_blank" 
            rel="noreferrer" 
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-900 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">WORD編集部</h3>
            </div>
            <p className="text-sm text-gray-600">筑波大学情報科学類誌WORD</p>
          </a>

          <a 
            href="" 
            target="_blank" 
            rel="noreferrer" 
            className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-400 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">re:master-LT</h3>
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">設立・主催</p>
            <p className="text-sm text-gray-600">情報メディア&芸術のライトニングトーク会</p>
          </a>

        </div>
      </section>

    </div>
  );
}