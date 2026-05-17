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
        <Links />
      </head>
      <body className="overflow-y-scroll">
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100/50 shadow-sm transition-all">
            <nav className="flex max-w-7xl mx-auto justify-between items-center">
              <div className="font-bold text-2xl text-black hover:text-gray-600 rounded-md transition-colors">
                <Link to="/">Portfolio / yukimizu</Link>
              </div>
              <div className="hidden md:flex gap-8 font-bold text-lg text-black items-center">
                <Link to="/profile" className="hover:text-gray-600 transition-colors">profile</Link>
                <Link to="/works" className="hover:text-gray-600 transition-colors">works</Link>
                <Link to="/contact" className="hover:text-gray-600 transition-colors">contact</Link>
                <Link to="/blog" className="hover:text-gray-600 transition-colors">blog</Link>
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
            
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md px-4 py-4 space-y-4 text-black border-b border-gray-100 shadow-lg">
                <Link to="/profile" className="block font-bold hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>profile</Link>
                <Link to="/works" className="block font-bold hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>works</Link>
                <Link to="/contact" className="block font-bold hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>contact</Link>
                <Link to="/blog" className="block font-bold hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>blog</Link>
              </div>
              )
            }
          </header>
          <main className="flex-grow bg-black">
            {children}
          </main>
          
          <footer className="py-8 mt-auto bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-400 font-medium tracking-wider">
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
