import { ArrowRight, CheckCircle2 } from "lucide-react";

import LeadForm from "@/components/LeadForm";

const LeadCaptureSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[32px] bg-blue-vivid p-8 text-white shadow-float md:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/15" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative z-[2]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90">
                <CheckCircle2 className="h-4 w-4" />
                Быстрый старт с SAU.PRO
              </div>

              <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
                Оставьте заявку на подключение платформы
              </h3>
              <p className="mb-8 max-w-[420px] text-base leading-relaxed text-white/80">
                Покажем, как устроена система, ответим на вопросы по партнерскому взаимодействию и подберем формат работы под ваш поток клиентов.
              </p>

              <div className="space-y-4">
                {[
                  "Покажем интерфейс и логику сопровождения дел",
                  "Объясним, как организована работа с документами и статусами",
                  "Поможем быстро запустить передачу клиентов в работу",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4 backdrop-blur-sm">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-vivid">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#E2E8F0]/60 bg-gradient-to-b from-white to-[#F5F7FA] p-8 shadow-[0_8px_40px_-12px_rgba(0,24,51,0.08)] md:p-10">
            <div className="mb-7">
              <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A6DFF]/70">
                Форма заявки
              </div>
              <h3 className="mb-2.5 text-2xl font-bold tracking-tight text-navy md:text-[1.85rem] md:leading-[1.2]">
                Оставьте контакты, и мы свяжемся с вами
              </h3>
              <p className="max-w-[380px] text-[15px] leading-relaxed text-slate/80">
                Заполните форму, чтобы получить персональную консультацию и демонстрацию платформы.
              </p>
            </div>

            <LeadForm
              source="partner_section_form"
              submitLabel="Получить консультацию"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
