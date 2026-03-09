import LeadFormDialog from "@/components/LeadFormDialog";

const ChainLinkDeco = () => (
  <div className="relative h-[140px] w-[80px] rounded-[40px] border-[12px] border-white/10">
    <div className="absolute left-[30px] top-[30px] h-[140px] w-[80px] rounded-[40px] border-[12px] border-white/10" />
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-32">
      {/* Blue decorative background */}
      <div className="absolute -right-[10%] -top-[20%] z-0 flex h-[140%] w-[60%] -skew-x-[10deg] flex-wrap items-center justify-center gap-5 overflow-hidden bg-blue-vivid">
        {Array.from({ length: 10 }).map((_, i) => (
          <ChainLinkDeco key={i} />
        ))}
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L 30 10 L 30 30 L 10 30 Z' stroke='rgba(255,255,255,0.05)' fill='none' stroke-width='2' rx='5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Dots decoration */}
        <div
          className="absolute right-10 top-10 z-[1] h-[60px] w-[120px] opacity-20"
          style={{
            backgroundImage: "radial-gradient(#465064 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative z-[2] max-w-[600px]">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-blue-vivid">
            Legal Tech Platform
          </h4>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy md:text-5xl lg:text-[3.5rem]">
            Автоматизация банкротства физических лиц
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate">
            Единая экосистема для арбитражных управляющих. Автоматическая генерация документов, синхронизация с КАД и умный помощник для ваших клиентов.
          </p>
          <div className="flex flex-wrap gap-4">
            <LeadFormDialog
              triggerClassName="inline-flex items-center justify-center rounded-lg bg-blue-vivid px-8 py-4 text-base font-semibold text-white shadow-btn-primary transition-all hover:-translate-y-0.5 hover:bg-blue-sky hover:shadow-btn-primary-hover"
            />
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border-2 border-navy px-8 py-4 text-base font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              Презентация
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
