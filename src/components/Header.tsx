import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NavItem {
  label: string;
  href: string;
  stub?: boolean;
}

const navItems: NavItem[] = [
  { label: "Возможности", href: "/#features" },
  { label: "Платформа", href: "/showcase" },
  { label: "Тарифы", href: "#", stub: true },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);

    if (item.stub) {
      toast({ title: "В разработке", description: "Раздел скоро будет доступен." });
      return;
    }

    // Route link (e.g. /platform)
    if (!item.href.includes("#")) {
      navigate(item.href);
      return;
    }

    // Anchor link (e.g. /#features)
    const hash = item.href.split("#")[1];
    if (location.pathname === "/") {
      // Already on home — just scroll
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home, then scroll after render
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="container relative flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-logo text-2xl font-bold uppercase tracking-wider text-navy">
          <svg viewBox="0 0 64 64" className="h-8 w-8">
            <circle cx="32" cy="32" r="30" fill="#C8A84E" />
            <circle cx="32" cy="32" r="26" fill="#3B5998" />
            <g fill="#ffffff">
              <polygon points="32,14 19,23 45,23" />
              <rect x="18" y="23" width="28" height="2.5" />
              <rect x="21" y="26" width="4" height="14" rx="1" />
              <rect x="30" y="26" width="4" height="14" rx="1" />
              <rect x="39" y="26" width="4" height="14" rx="1" />
              <rect x="18" y="40" width="28" height="3" rx="0.5" />
              <rect x="16" y="43" width="32" height="2.5" rx="0.5" />
            </g>
          </svg>
          SAU.PRO
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className="text-[0.95rem] font-medium text-slate transition-colors hover:text-blue-vivid"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate transition-colors hover:bg-blue-50 hover:text-blue-vivid"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
