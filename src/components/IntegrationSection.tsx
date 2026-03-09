const IntegrationSection = () => {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L 30 10 L 30 30 L 10 30 Z' stroke='rgba(255,255,255,0.05)' fill='none' stroke-width='2' rx='5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-[2]">
        <div className="flex flex-wrap items-center gap-16">
          <div className="min-w-[300px] flex-1">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-[2.5rem]">
              Полная синхронизация с Kad.arbitr.ru
            </h2>
            <p className="mb-8 text-lg text-white/70">
              Забудьте о ручном мониторинге. SAU.PRO каждые 15 минут проверяет картотеку арбитражных дел и мгновенно обновляет статусы в вашей CRM.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-vivid" />
                Уведомления о новых определениях суда
              </li>
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-vivid" />
                Авто-загрузка PDF файлов судебных актов
              </li>
              <li className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-blue-vivid" />
                Контроль сроков обжалования
              </li>
            </ul>
          </div>

          <div className="min-w-[300px] flex-1">
            <div className="flex items-center justify-around rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-md">
              <div className="text-center">
                <div className="mb-2.5 font-bold">KAD.ARBITR</div>
                <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-white">
                  <span className="text-2xl font-bold text-navy">⚖️</span>
                </div>
              </div>
              <div className="animate-pulse text-3xl text-blue-vivid">→</div>
              <div className="text-center">
                <div className="mb-2.5 font-bold">SAU.PRO</div>
                <div className="mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-blue-vivid">
                  <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
