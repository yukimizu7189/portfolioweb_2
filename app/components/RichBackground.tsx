import React, { useEffect, useRef } from "react";

const Sparkle = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0Q12 12 0 12Q12 12 12 24Q12 12 24 12Q12 12 12 0Z" />
  </svg>
);

export default function RichBackground({ title }: { title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        containerRef.current.style.setProperty("--scroll-y", `${scrollY}px`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white"
      style={{ "--scroll-y": "0px" } as React.CSSProperties}
    >
      {/* Background Vivid Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent-500/10 rounded-full blur-[120px] animate-blob" style={{ backgroundColor: 'rgba(255, 0, 127, 0.12)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '-5s', backgroundColor: 'rgba(59, 130, 246, 0.08)' }} />

      {/* Overflowing Background Title */}
      {title && (
        <div className="absolute top-[15%] left-[-5%] whitespace-nowrap text-[20vw] font-black text-black/[0.03] leading-none select-none tracking-tighter uppercase">
          {title}
        </div>
      )}

      {/* --- Parallax Layer: Slow (-0.15) for Large Decorative Elements --- */}
      <div 
        className="absolute inset-0 transition-transform duration-150"
        style={{ transform: "translateY(calc(var(--scroll-y) * -0.15))" }}
      >
        {/* Giant Sparkles (Now Scroll-Responsive) */}
        <Sparkle size={450} className="absolute top-[65%] left-[-180px] text-accent-500/05 rotate-[25deg]" style={{ color: 'rgba(255, 0, 127, 0.05)' }} />
        <Sparkle size={350} className="absolute top-[5%] right-[-120px] text-blue-500/05 -rotate-[15deg]" style={{ color: 'rgba(59, 130, 246, 0.05)' }} />
      </div>

      {/* --- Parallax Layer: Fast (-0.5) --- */}
      <div 
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: "translateY(calc(var(--scroll-y) * -0.5))" }}
      >
        {/* Fine Lines */}
        <div className="absolute top-[5%] left-[12%] w-[1px] h-screen bg-black/10" />
        <div className="absolute top-[20%] right-[10%] w-[1px] h-[800px] bg-accent-500/30" style={{ backgroundColor: 'rgba(255, 0, 127, 0.3)' }} />
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-[40%] right-[25%] text-black/20 rotate-12 scale-110">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Large Sparkles (Fast) */}
        <Sparkle size={64} className="absolute top-[25%] left-[60%] text-accent-500/40 animate-scale-pulse" style={{ color: 'rgba(255, 0, 127, 0.4)' }} />
      </div>

      {/* --- Parallax Layer: Medium (-0.3) --- */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ transform: "translateY(calc(var(--scroll-y) * -0.3))" }}
      >
        {/* Floating Shapes */}
        <div className="absolute top-[30%] right-[18%] w-24 h-24 border border-black/10 animate-spin-slow" />
        <div className="absolute bottom-[35%] left-[20%] w-32 h-32 border border-accent-500/20 rotate-45 animate-float" style={{ borderColor: 'rgba(255, 0, 127, 0.2)' }} />

        {/* Prominent Sparkles (Medium) */}
        <Sparkle size={100} className="absolute top-[55%] right-[22%] text-black/10 animate-float" />
      </div>

      {/* --- Background Static / Grid Layer --- */}
      <div className="absolute inset-0">
        {/* Scroll-Responsive Grid (Refined) */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: "translateY(calc(var(--scroll-y) * 0.08))"
          }}
        />
        
        {/* Huge Shapes */}
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] border-[2px] border-accent-500/10 animate-blob blur-sm" 
             style={{ borderColor: 'rgba(255, 0, 127, 0.1)' }} />
        
        <div className="absolute top-[65%] right-[-5%] w-64 h-64 border-[2px] border-black/5 animate-spin-slow" />
      </div>
    </div>
  );
}
