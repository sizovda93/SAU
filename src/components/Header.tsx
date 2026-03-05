import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Кабинет АУ", href: "#cabinet" },
  { label: "Кабинет Должника", href: "#debtor" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 font-logo text-2xl font-bold uppercase tracking-wider text-navy">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-blue-vivid">
            <path d="M7 7h10v3l-4 4 4 4v3H7v-3l4-4-4-4z" fill="currentColor" />
          </svg>
          IronChain
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.95rem] font-medium text-slate transition-colors hover:text-blue-vivid"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden rounded-lg bg-blue-vivid px-6 py-2 text-sm font-semibold text-white shadow-btn-primary transition-all hover:-translate-y-0.5 hover:bg-blue-sky hover:shadow-btn-primary-hover md:inline-flex"
          >
            Войти
          </a>
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate transition-colors hover:bg-blue-50 hover:text-blue-vivid"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="mt-2 rounded-lg bg-blue-vivid px-6 py-2 text-center text-sm font-semibold text-white"
            >
              Войти
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
