const CabinetSection = () => {
  return (
    <section id="debtor" className="bg-white py-24">
      <div className="container">
        <div className="mb-16 text-center">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-blue-vivid">
            Для ваших клиентов
          </h4>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy md:text-[2.5rem]">
            Личный кабинет должника
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-slate">
            Снимите нагрузку с телефона. Клиент сам загружает документы, видит прогресс и задает вопросы ИИ-помощнику.
          </p>
        </div>

        <div className="grid h-[500px] grid-cols-[250px_1fr] gap-8 overflow-hidden rounded-2xl bg-off-white p-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
          {/* Sidebar mock */}
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="h-[30px] w-[30px] rounded-full bg-gray-300" />
              <div className="h-2.5 w-20 self-center rounded bg-gray-300" />
            </div>
            <div className="h-3 w-3/5 rounded bg-blue-vivid" />
            <div className="h-3 w-full rounded bg-[#EFF4F8]" />
            <div className="h-3 w-full rounded bg-[#EFF4F8]" />
            <div className="mt-auto">
              <div className="h-3 w-4/5 rounded bg-[#FFEBEB]" />
            </div>
          </div>

          {/* Chat mock */}
          <div className="flex flex-col justify-between rounded-xl bg-white p-8 shadow-soft">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 font-semibold">
                <span>Ассистент по делу А40-12345/23</span>
                <span className="text-xs text-blue-vivid">Онлайн</span>
              </div>
              <div className="mb-4 ml-auto max-w-[80%] self-end rounded-xl rounded-br-none bg-blue-vivid p-4 text-sm text-white">
                Когда будет следующее заседание?
              </div>
              <div className="mb-4 max-w-[80%] rounded-xl rounded-bl-none bg-[#F0F7FF] p-4 text-sm text-navy">
                Следующее заседание назначено на 24 октября 2024 года. Суд будет рассматривать отчет финансового управляющего. Ваше присутствие не требуется.
              </div>
              <div className="mb-4 ml-auto max-w-[80%] self-end rounded-xl rounded-br-none bg-blue-vivid p-4 text-sm text-white">
                Какие документы нужно донести?
              </div>
              <div className="max-w-[80%] rounded-xl rounded-bl-none bg-[#F0F7FF] p-4 text-sm text-navy">
                Необходимо загрузить скан Справки 2-НДФЛ за текущий год. Вы можете сделать это в разделе "Документы".
              </div>
            </div>

            <div className="mt-4 flex gap-2.5">
              <input
                type="text"
                defaultValue="Понял, спасибо"
                className="flex-1 rounded-lg border border-gray-100 px-4 py-2.5 text-slate outline-none focus:border-blue-vivid"
              />
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-vivid text-white">
                ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CabinetSection;
