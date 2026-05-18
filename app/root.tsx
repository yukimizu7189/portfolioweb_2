import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState } from "react";
import type { Route } from "./+types/root";
import "./app.css";
import RichBackground from "./components/RichBackground";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <html lang="jp">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="icon" type="image/x-icon" href="/favicon.jpg" />
        <Links />
      </head>
      <body className="overflow-y-scroll relative" style={{ backgroundColor: 'white', color: 'black' }}>
        <RichBackground />
        <div className="flex flex-col min-h-screen relative z-10">
          <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl p-4 border-b border-gray-200/50 transition-all">
            <nav className="flex max-w-7xl mx-auto justify-between items-center">
              <div className="font-light text-2xl text-black hover:text-accent-600 transition-colors tracking-tighter">
                <Link to="/" className="group flex items-center gap-2">
                  {/* <span className="w-2 h-2 bg-accent-500 rounded-full group-hover:scale-150 transition-transform" style={{ backgroundColor: '#ff1a6d' }}></span> */}
                  <span>Portfolio / yukimizu</span>
                </Link>
              </div>
              <div className="hidden md:flex gap-10 font-light text-sm uppercase tracking-[0.2em] text-gray-500 items-center">
                <Link to="/profile" className="hover:text-accent-500 hover:font-bold transition-all relative group">
                  profile
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-500 transition-all group-hover:w-full" style={{ backgroundColor: '#ff1a6d' }}></span>
                </Link>
                <Link to="/works" className="hover:text-accent-500 hover:font-bold transition-all relative group">
                  works
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-500 transition-all group-hover:w-full" style={{ backgroundColor: '#ff1a6d' }}></span>
                </Link>
                <Link to="/contact" className="hover:text-accent-500 hover:font-bold transition-all relative group">
                  contact
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-500 transition-all group-hover:w-full" style={{ backgroundColor: '#ff1a6d' }}></span>
                </Link>
                <Link to="/blog" className="hover:text-accent-500 hover:font-bold transition-all relative group">
                  blog
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-500 transition-all group-hover:w-full" style={{ backgroundColor: '#ff1a6d' }}></span>
                </Link>
              </div>
              <button
                className="md:hidden p-2 focus:outline-none text-black hover:text-gray-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </nav>
            
            <div className={`md:hidden absolute top-full left-0 w-full bg-white/80 backdrop-blur-xl px-4 py-8 space-y-6 text-center border-b border-gray-100 shadow-xl transition-all duration-300 origin-top ${
              isMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
            }`}>
              <Link to="/profile" className="block font-light text-xl uppercase tracking-widest hover:text-accent-500 transition-colors" onClick={() => setIsMenuOpen(false)}>profile</Link>
              <Link to="/works" className="block font-light text-xl uppercase tracking-widest hover:text-accent-500 transition-colors" onClick={() => setIsMenuOpen(false)}>works</Link>
              <Link to="/contact" className="block font-light text-xl uppercase tracking-widest hover:text-accent-500 transition-colors" onClick={() => setIsMenuOpen(false)}>contact</Link>
              <Link to="/blog" className="block font-light text-xl uppercase tracking-widest hover:text-accent-500 transition-colors" onClick={() => setIsMenuOpen(false)}>blog</Link>
              <div className="pt-4 flex justify-center">
                <div className="w-12 h-[1px] bg-accent-500" style={{ backgroundColor: '#ff1a6d' }}></div>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 font-medium tracking-wider">
                &copy; {new Date().getFullYear()} yukimizu. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "404 not found 見つからないよ〜〜〜"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
