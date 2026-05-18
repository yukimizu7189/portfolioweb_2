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

export default function RichBackground() {
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
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ "--scroll-y": "0px" } as React.CSSProperties}
    >
      {/* --- Parallax Layer: Fast (-0.4) --- */}
      <div 
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: "translateY(calc(var(--scroll-y) * -0.4))" }}
      >
        {/* Large Vertical Lines */}
        <div className="absolute top-[5%] left-[8%] w-[2px] h-64 bg-black/20" />
        <div className="absolute top-[45%] right-[20%] w-[2px] h-96 bg-accent-500/40" style={{ backgroundColor: 'rgba(255, 26, 109, 0.4)' }} />
        
        {/* Bold Arrows */}
        <div className="absolute top-[10%] right-[35%] text-black/30 rotate-45">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className="absolute top-[75%] left-[12%] text-accent-500/50 -rotate-12" style={{ color: 'rgba(255, 26, 109, 0.5)' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Large Sparkles (Fast) */}
        <Sparkle size={48} className="absolute top-[20%] left-[55%] text-accent-500/60 animate-scale-pulse" style={{ color: 'rgba(255, 26, 109, 0.6)' }} />
      </div>

      {/* --- Parallax Layer: Medium (-0.25) --- */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ transform: "translateY(calc(var(--scroll-y) * -0.25))" }}
      >
        {/* Prominent Crosses */}
        <div className="absolute top-[35%] left-[35%] text-black/20">
          <svg width="40" height="40" viewBox="0 0 15 15" fill="currentColor">
            <rect x="7" y="0" width="1.5" height="15" />
            <rect x="0" y="7" width="15" height="1.5" />
          </svg>
        </div>
        <div className="absolute top-[65%] right-[35%] text-accent-500/40" style={{ color: 'rgba(255, 26, 109, 0.4)' }}>
          <svg width="60" height="60" viewBox="0 0 25 25" fill="currentColor">
            <rect x="12" y="0" width="1.5" height="25" />
            <rect x="0" y="12" width="25" height="1.5" />
          </svg>
        </div>

        {/* Resized Floating Squares (Smaller) */}
        <div className="absolute top-[15%] right-[10%] w-12 h-12 border-2 border-black/10 rotate-12" />
        <div className="absolute bottom-[25%] left-[10%] w-16 h-16 border-2 border-accent-500/20 rotate-45" style={{ borderColor: 'rgba(255, 26, 109, 0.2)' }} />

        {/* Prominent Sparkles (Medium) */}
        <Sparkle size={80} className="absolute top-[45%] right-[20%] text-black/10 animate-float" />
        <Sparkle size={40} className="absolute bottom-[20%] right-[15%] text-accent-500/40 animate-scale-pulse delay-700" style={{ color: 'rgba(255, 26, 109, 0.4)' }} />
      </div>

      {/* --- Background Static / Grid Layer --- */}
      <div className="absolute inset-0">
        {/* Scroll-Responsive Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.08) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '60px 60px',
            transform: "translateY(calc(var(--scroll-y) * 0.05))"
          }}
        />
        
        {/* Huge Shapes (Original) */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] border-[4px] border-accent-500/20 rounded-full animate-float blur-md" 
             style={{ borderColor: 'rgba(255, 26, 109, 0.2)' }} />
        
        {/* Resized Background Square (Smaller) */}
        <div className="absolute top-[50%] right-[5%] w-24 h-24 border-[3px] border-black/10 animate-float-reverse" />

        {/* Giant Background Sparkles */}
        <Sparkle size={200} className="absolute top-[60%] left-[-50px] text-accent-500/10 rotate-[25deg]" style={{ color: 'rgba(255, 26, 109, 0.1)' }} />
        <Sparkle size={120} className="absolute top-[5%] left-[40%] text-black/5 -rotate-[15deg]" />
      </div>
      
      {/* Bold Decorative Lines (Non-Parallax) */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/10" />
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-black/10" />
    </div>
  );
}
