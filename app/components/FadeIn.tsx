import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number; // 複数の要素をズラして表示するための遅延時間（ミリ秒）
};

export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  // 画面に表示されたかどうかを判定するState
  const [isVisible, setIsVisible] = useState(false);
  // 監視する対象のHTML要素（div）を入れるための箱
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 画面のどの位置に来たら判定するか（下から10%の線を越えたら発動）
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // 一度表示されたら、監視を解除する（何度もフェードインさせないため）
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" } 
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      // Tailwindでアニメーションを定義
      // isVisible が true になったら opacity-100 と translate-y-0 に変化する
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}