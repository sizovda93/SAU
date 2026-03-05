const Footer = () => {
  return (
    <footer className="bg-navy py-16 text-white/40">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 font-logo text-2xl font-bold uppercase tracking-wider text-white">
              IRONCHAIN
            </div>
            <p className="mt-4 text-sm text-white/40">
              Профессиональное ПО для арбитражных управляющих. Соответствует 127-ФЗ.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Платформа</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">Возможности</a></li>
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">Безопасность</a></li>
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">Интеграции</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Клиентам</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">Вход в кабинет</a></li>
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">База знаний</a></li>
              <li><a href="#" className="text-inherit no-underline transition-colors hover:text-white/70">Техподдержка</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Контакты</h4>
            <p className="mb-2">+7 (495) 000-00-00</p>
            <p>hello@ironchain.ru</p>
            <p className="mt-4">г. Москва, Пресненская наб., 12</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          © 2024 IronChain Systems. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
