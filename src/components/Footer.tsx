import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const legalDocuments = [
  {
    title: "Политика конфиденциальности",
    description: "Порядок сбора, хранения и использования информации, которую пользователь оставляет на сайте.",
    content: [
      "SAU.PRO уважает право пользователей на неприкосновенность частной жизни и принимает меры для защиты предоставленных данных.",
      "Мы обрабатываем сведения, которые пользователь добровольно указывает в формах сайта: фамилию, имя, отчество, номер телефона, адрес электронной почты и иные данные, необходимые для обратной связи и демонстрации сервиса.",
      "Информация используется для обработки заявок, связи с пользователем, предоставления консультаций, улучшения качества сервиса и исполнения требований законодательства Российской Федерации.",
      "Доступ к данным получают только уполномоченные сотрудники и подрядчики, которым такая информация необходима для выполнения своих обязанностей. Мы не раскрываем персональные данные третьим лицам без законных оснований.",
      "Пользователь вправе запросить уточнение, обновление или удаление своих данных, направив обращение на адрес hello@ironchain.ru.",
    ],
  },
  {
    title: "Обработка персональных данных",
    description: "Условия и цели обработки персональных данных, передаваемых через формы на сайте.",
    content: [
      "Отправляя форму на сайте, пользователь выражает согласие на обработку своих персональных данных в целях обработки обращения, подготовки предложения, проведения консультации и последующего взаимодействия по запросу.",
      "Обработка включает сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу в случаях, предусмотренных законом, обезличивание, блокирование и удаление персональных данных.",
      "Правовым основанием обработки является согласие субъекта персональных данных, а также необходимость исполнения обязательств, возникающих при обращении пользователя через сайт.",
      "Персональные данные обрабатываются с использованием средств автоматизации и без них, с соблюдением требований к конфиденциальности и безопасности информации.",
      "Согласие действует до достижения целей обработки либо до его отзыва пользователем. Для отзыва согласия необходимо направить письменное уведомление на hello@ironchain.ru.",
    ],
  },
  {
    title: "Согласие на получение информации",
    description: "Пояснение о том, как используются контакты пользователя для связи по заявке.",
    content: [
      "Оставляя контактные данные, пользователь подтверждает, что указанные телефон и email могут использоваться для связи по заявке, предоставления информации о продуктах и демонстрации возможностей платформы.",
      "Коммуникации осуществляются только в объеме, необходимом для обработки обращения и сопровождения интереса пользователя к сервису SAU.PRO.",
      "Пользователь может отказаться от дальнейших информационных сообщений в любой момент, сообщив об этом по телефону, электронной почте или в ответ на полученное сообщение.",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-navy py-16 text-white/70">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 font-logo text-2xl font-bold uppercase tracking-wider text-white">
              SAU.PRO
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Профессиональное ПО для арбитражных управляющих. Решение для автоматизации
              процессов, безопасной работы с данными и удобного взаимодействия с клиентами.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Платформа</h4>
            <ul className="space-y-2 text-sm">
              <li>Возможности</li>
              <li>Безопасность</li>
              <li>Интеграции</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Клиентам</h4>
            <ul className="space-y-2 text-sm">
              <li>Вход в кабинет</li>
              <li>База знаний</li>
              <li>Техподдержка</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Контакты</h4>
            <p className="mb-2 text-sm">+7 (495) 000-00-00</p>
            <p className="text-sm">hello@ironchain.ru</p>
            <p className="mt-4 text-sm text-white/50">г. Москва, Пресненская наб., 12</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-white/60">
            {legalDocuments.map((document) => (
              <Dialog key={document.title}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-inherit transition-colors hover:text-white"
                  >
                    {document.title}
                  </button>
                </DialogTrigger>

                <DialogContent className="max-h-[85vh] max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-0">
                  <div className="border-b border-slate-100 bg-slate-50 px-8 py-6">
                    <DialogHeader className="space-y-3 text-left">
                      <DialogTitle className="text-2xl text-slate-900">
                        {document.title}
                      </DialogTitle>
                      <DialogDescription className="text-sm leading-relaxed text-slate-500">
                        {document.description}
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <div className="max-h-[calc(85vh-120px)] space-y-4 overflow-y-auto px-8 py-6 text-sm leading-7 text-slate-700">
                    {document.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-white/40">
            © 2026 SAU.PRO Systems. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
