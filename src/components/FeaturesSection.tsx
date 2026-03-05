import { FileText, Layers, MessageSquare } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Интеллектуальный OCR",
    description:
      "Загружайте сканы паспортов, СНИЛС и кредитных договоров. Система автоматически распознает данные и заполнит карточку должника.",
  },
  {
    icon: Layers,
    title: "Генератор документов",
    description:
      "Опись имущества, список кредиторов и исковые заявления формируются в один клик на основе распознанных данных. Строго по формам Минэкономразвития.",
  },
  {
    icon: MessageSquare,
    title: "Ассистент АУ",
    description:
      "ИИ анализирует ход дела и подсказывает следующие шаги. Напоминания о сроках публикаций в ЕФРСБ и заседаниях.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-off-white py-24">
      {/* Chain background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 C 20 10 30 10 30 20 L 30 40 C 30 50 20 50 20 40 Z' stroke='%232A6DFF' stroke-width='4' fill='none'/%3E%3Cpath d='M35 20 C 35 10 45 10 45 20 L 45 40 C 45 50 35 50 35 40 Z' stroke='%232A6DFF' stroke-width='4' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="container relative z-[2]">
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy md:text-[2.5rem]">
            Инструменты для эффективности
          </h2>
          <p className="text-lg text-slate">
            Мы убрали рутину, чтобы вы могли вести больше дел одновременно.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white p-10 shadow-soft transition-all hover:-translate-y-1 hover:shadow-float"
            >
              <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-vivid text-white shadow-icon-blue">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-navy">
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-slate">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
