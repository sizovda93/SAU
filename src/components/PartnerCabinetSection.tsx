import {
  Briefcase,
  CheckCircle2,
  Clock3,
  FileText,
  FolderOpen,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const benefits = [
  {
    title: "1. Все дела партнера собраны в одном месте",
    description:
      "Партнеру не нужно искать информацию по чатам, таблицам, почте и мессенджерам. В личном кабинете отображаются все переданные дела, их текущий статус, история взаимодействия и ключевая информация по каждому клиенту.",
    points: [
      "быстрый доступ ко всем делам 24/7",
      "удобный контроль текущей загрузки",
      "прозрачность по каждому клиенту",
      "отсутствие путаницы и потери информации",
    ],
    icon: FolderOpen,
  },
  {
    title: "2. Полная прозрачность работы по каждому делу",
    description:
      "Партнер всегда понимает, на каком этапе находится дело, что уже сделано и какие действия ожидаются дальше. Это особенно важно для тех, кто ценит контроль, репутацию перед своим клиентом и уверенность в работе арбитражного управляющего.",
    points: [
      "понимание реальной стадии работы",
      "возможность быстро ориентироваться по срокам и этапам",
      "доверие к процессу за счет прозрачности",
      "снижение количества лишних уточняющих звонков и сообщений",
    ],
    icon: Briefcase,
  },
  {
    title: "3. Прямая связь с арбитражным управляющим и командой",
    description:
      "В личном кабинете партнер может напрямую общаться со мной как с арбитражным управляющим, с моими помощниками и при необходимости со своими должниками внутри единого рабочего пространства. Это делает коммуникацию быстрой, понятной и зафиксированной в одном месте.",
    points: [
      "оперативное решение рабочих вопросов",
      "отсутствие разорванной коммуникации по разным каналам",
      "вся история общения сохраняется внутри платформы",
      "меньше недопониманий и потерь важных деталей",
    ],
    icon: MessageSquareMore,
  },
  {
    title: "4. Общение с должником без лишних посредников",
    description:
      "Партнер может оставаться в курсе коммуникации с клиентом и при этом не тратить лишнее время на постоянную пересылку информации. Все участники процесса взаимодействуют в понятной системе, где каждый видит нужную ему часть работы.",
    points: [
      "ускорение сбора информации от должника",
      "снижение числа ошибок из-за передачи данных через третьи руки",
      "более быстрая подготовка документов и запуск процесса",
      "удобное сопровождение клиента на всех этапах",
    ],
    icon: Users,
  },
  {
    title: "5. Загрузка документов сразу в платформу",
    description:
      "Партнер может загружать документы должника напрямую в систему. Ничего не теряется в мессенджерах, на почте или в личных переписках. Все файлы хранятся централизованно и доступны в нужном деле.",
    points: [
      "безопасное и удобное хранение документов",
      "быстрый доступ к файлам в любой момент",
      "исключение потери важных бумаг",
      "ускорение подготовки дела к работе",
      "порядок вместо хаоса в документах",
    ],
    icon: FileText,
  },
  {
    title: "6. Экономия времени партнера",
    description:
      "Личный кабинет сокращает количество ручной работы. Не нужно отдельно запрашивать статусы, пересылать документы по несколько раз, искать старые сообщения или уточнять, кому и что уже передали.",
    points: [
      "меньше рутинных действий",
      "быстрее запуск и сопровождение дел",
      "возможность вести больше клиентов без лишней нагрузки",
      "высвобождение времени для продаж, консультаций и развития своего направления",
    ],
    icon: Clock3,
  },
  {
    title: "7. Повышение качества сервиса для клиента партнера",
    description:
      "Когда у партнера есть прозрачный инструмент контроля, он сам выглядит более профессионально в глазах своего клиента. Он всегда может быстро дать обратную связь, ответить на вопрос о статусе дела и показать, что процесс находится под контролем.",
    points: [
      "рост доверия со стороны клиента",
      "усиление экспертного образа партнера",
      "повышение лояльности и удержания клиентов",
      "более высокий уровень сервиса без увеличения собственной нагрузки",
    ],
    icon: Sparkles,
  },
  {
    title: "8. Надежная система работы без потерь и сбоев",
    description:
      "Платформа делает взаимодействие системным. Все процессы выстроены так, чтобы минимизировать человеческий фактор: не забыть документ, не потерять сообщение и не пропустить важный этап.",
    points: [
      "стабильность в работе",
      "меньше ошибок",
      "предсказуемость процессов",
      "уверенность, что дело движется по четкому маршруту",
    ],
    icon: ShieldCheck,
  },
];

const PartnerCabinetSection = () => {
  return (
    <section id="partner-cabinet" className="relative overflow-hidden bg-off-white py-24">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(42,109,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(10,31,68,0.08),transparent_34%)]" />
      <div
        className="absolute inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,31,68,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(10,31,68,0.9) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-[2]">
        <div className="mb-10 max-w-[860px]">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-blue-vivid">
            Для партнеров
          </h4>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-navy md:text-[2.8rem]">
            Личный кабинет партнера — полный контроль над делами в одном месте
          </h2>
          <p className="text-lg leading-relaxed text-slate">
            Мы создали удобную платформу для партнеров, которые передают нам клиентов на сопровождение процедур банкротства и арбитражных дел. Это не просто кабинет для просмотра статусов, а рабочее пространство, в котором партнер в любой момент видит, что происходит по каждому делу, может быстро связаться с нашей командой и загрузить все необходимые документы без хаоса, потерь и бесконечных переписок.
          </p>
        </div>

        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-navy p-8 text-white shadow-float">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
              <CheckCircle2 className="h-4 w-4 text-blue-vivid" />
              Единое рабочее пространство партнера
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight">
              Зачем это партнеру
            </h3>
            <p className="mb-8 text-base leading-relaxed text-white/75">
              Когда дел много, а клиентов нужно сопровождать быстро и профессионально, главная проблема заключается в потере информации, задержках в коммуникации и отсутствии прозрачности по делу. Личный кабинет решает эту проблему: все процессы находятся в одной системе, а партнер получает понятный и удобный инструмент контроля.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Все статусы и история работы по каждому клиенту",
                "Быстрая связь с управляющим, командой и должником",
                "Централизованная загрузка документов без потерь",
                "Контроль процессов без лишней ручной рутины",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-vivid text-white shadow-icon-blue">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white p-8 shadow-soft">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-blue-vivid">
                  Что получает партнер
                </div>
                <div className="text-2xl font-bold tracking-tight text-navy">
                  Контроль, прозрачность и порядок
                </div>
              </div>
              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-right">
                <div className="text-xs text-slate">Доступ</div>
                <div className="text-lg font-bold text-navy">24/7</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Все прозрачно и под контролем",
                "Все документы находятся в одном месте",
                "Вся коммуникация структурирована внутри платформы",
                "Каждый участник процесса понимает, что происходит",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-off-white px-4 py-4">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-vivid text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-slate">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-14">
          <div className="mb-8 max-w-[760px]">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-navy md:text-[2.1rem]">
              Преимущества личного кабинета партнера
            </h3>
            <p className="text-lg text-slate">
              Все ключевые процессы собраны в одной системе: от контроля статусов до загрузки документов и общения с участниками дела.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group rounded-[28px] border border-white/80 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-float"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-vivid text-white shadow-icon-blue">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h4 className="mb-4 text-xl font-bold tracking-tight text-navy">
                  {benefit.title}
                </h4>
                <p className="mb-5 leading-relaxed text-slate">{benefit.description}</p>
                <div className="rounded-2xl bg-off-white p-5">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-blue-vivid">
                    Что это дает
                  </div>
                  <div className="space-y-3">
                    {benefit.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-vivid" />
                        <p className="text-sm leading-relaxed text-slate">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#DDE7F3] bg-white p-8 shadow-soft">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-blue-vivid">
              Почему это важно для партнера
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-navy">
              Современная система вместо разрозненных каналов
            </h3>
            <p className="mb-6 leading-relaxed text-slate">
              Большинство арбитражных управляющих до сих пор работают по старинке: через мессенджеры, звонки, отдельные папки и разрозненные таблицы. Это неудобно, непрозрачно и создает постоянные риски потери информации.
            </p>
            <div className="space-y-3">
              {[
                "все прозрачно",
                "все под контролем",
                "все документы в одном месте",
                "вся коммуникация структурирована",
                "каждый участник процесса понимает, что происходит",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-off-white px-4 py-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-vivid" />
                  <p className="text-slate">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-navy p-8 text-white shadow-float">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-blue-200">
              Как это усиливает наше предложение
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight">
              Профессионально организованная инфраструктура совместной работы
            </h3>
            <p className="mb-6 leading-relaxed text-white/75">
              Наше преимущество заключается не только в опыте ведения процедур, но и в том, что партнер получает удобную инфраструктуру для совместной работы. Сотрудничество строится не на хаосе, бесконечных уточнениях и потерянных документах, а на понятной, прозрачной и профессионально организованной системе.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Четкая маршрутизация процессов по каждому делу",
                "Фиксация коммуникации внутри единой платформы",
                "Быстрый обмен документами без потерь",
                "Прозрачная модель сопровождения для партнера и клиента",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm leading-relaxed text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCabinetSection;
