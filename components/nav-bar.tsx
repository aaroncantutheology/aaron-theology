import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 antialiased font-sans">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-slate-700 transition-colors"
        >
          Dad&apos;s Blog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link 
            href="/tagged" 
            className="hover:text-slate-900 transition-colors"
          >
            Articles
          </Link>
          <Link 
            href="/about" 
            className="hover:text-slate-900 transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}