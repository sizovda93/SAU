const Footer = () => {
  return (
    <footer className="bg-navy py-12 text-white/40">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <div className="font-logo text-2xl font-bold uppercase tracking-wider text-white">
            SAU.PRO
          </div>
          <p className="text-center text-sm text-white/40">
            Профессиональное ПО для арбитражных управляющих. Соответствует 127-ФЗ.
          </p>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="/privacy" className="text-white/50 no-underline transition-colors hover:text-white/80">
              Политика конфиденциальности
            </a>
            <a href="/cookies" className="text-white/50 no-underline transition-colors hover:text-white/80">
              Политика использования cookies
            </a>
            <a href="/consent" className="text-white/50 no-underline transition-colors hover:text-white/80">
              Согласие на обработку персональных данных
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} SAU.PRO Systems. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
