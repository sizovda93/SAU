import { useState, useEffect } from "react";
import { getSettings, SiteSetting } from "@/lib/api";
import { Monitor, Smartphone, X } from "lucide-react";

const desktopSections = [
  {
    title: "Личный кабинет партнера",
    items: [
      { key: "screenshot_partner_cabinet", label: "Личный кабинет партнера" },
    ],
  },
  {
    title: "Карточка дела",
    items: [
      { key: "screenshot_case_card", label: "Карточка дела" },
      { key: "screenshot_case_card_2", label: "Карточка дела 2" },
      { key: "screenshot_case_card_3", label: "Карточка дела 3" },
      { key: "screenshot_case_card_4", label: "Карточка дела 4" },
    ],
  },
  {
    title: "Внутренний чат",
    items: [
      { key: "screenshot_chat", label: "Диалоги" },
      { key: "screenshot_chat_2", label: "Каналы" },
    ],
  },
  {
    title: "Передача дела",
    items: [
      { key: "screenshot_case_submission", label: "Передача дела" },
      { key: "screenshot_case_submission_2", label: "Передача дела 2" },
      { key: "screenshot_case_submission_3", label: "Передача дела 3" },
      { key: "screenshot_case_submission_4", label: "Передача дела 4" },
    ],
  },
  {
    title: "Академия банкротства",
    items: [
      { key: "screenshot_academy", label: "Курсы" },
      { key: "screenshot_academy_2", label: "Курс" },
    ],
  },
];

const partnerMobileScreenshots = [
  { key: "screenshot_mobile_app", label: "Мобильное приложение для партнера" },
  { key: "screenshot_mobile_partner_2", label: "Чат в приложении партнера" },
  { key: "screenshot_mobile_partner_3", label: "Уведомления партнера" },
];


const IPhoneFrame = ({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) => (
  <div className="flex flex-col items-center gap-4">
    <div className={`relative mx-auto w-full max-w-[260px] ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      <div className="relative overflow-hidden rounded-[40px] border-[6px] border-blue-vivid bg-blue-vivid shadow-xl">
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[34px] bg-slate-50">
          {children}
        </div>
      </div>
      <div className="absolute -right-[8px] top-[100px] h-[40px] w-[3px] rounded-r-sm bg-blue-vivid" />
      <div className="absolute -left-[8px] top-[80px] h-[24px] w-[3px] rounded-l-sm bg-blue-vivid" />
      <div className="absolute -left-[8px] top-[112px] h-[24px] w-[3px] rounded-l-sm bg-blue-vivid" />
    </div>
    <h3 className="text-center text-lg font-bold tracking-tight text-navy">
      {label}
    </h3>
  </div>
);

const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <button
      className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      onClick={onClose}
    >
      <X className="h-6 w-6" />
    </button>
    <img
      src={src}
      alt={alt}
      className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

const PlatformShowcase = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    getSettings()
      .then((data: SiteSetting[]) => {
        const map: Record<string, string> = {};
        data.forEach((s) => {
          if (s.setting_value) map[s.setting_key] = s.setting_value;
        });
        setSettings(map);
      })
      .catch(() => {});
  }, []);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  return (
    <section id="platform" className="relative overflow-hidden bg-off-white py-24">
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,31,68,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(10,31,68,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative z-[2]">
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-blue-vivid">
            Интерфейс платформы
          </h4>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy md:text-[2.5rem]">
            Как выглядит SAU.PRO изнутри
          </h2>
          <p className="text-lg text-slate">
            Прозрачная система управления делами, удобная коммуникация и полный контроль — на любом устройстве.
          </p>
        </div>

        {/* Desktop screenshots by section */}
        {desktopSections.map((section, idx) => (
          <div key={section.title} className={idx > 0 ? "mt-16" : ""}>
            <h3 className="mb-8 text-center text-2xl font-bold tracking-tight text-navy md:text-3xl">
              {section.title}
            </h3>
            <div className={`grid gap-8 ${section.items.length === 1 ? "mx-auto max-w-3xl" : "lg:grid-cols-2"}`}>
              {section.items.map((item) => {
                const url = settings[item.key];
                return (
                  <div
                    key={item.key}
                    className={`group overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-float ${url ? "cursor-pointer" : ""}`}
                    onClick={() => url && openLightbox(url, item.label)}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                      {url ? (
                        <img
                          src={url}
                          alt={item.label}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-300">
                          <Monitor className="h-12 w-12" />
                          <span className="text-sm">Скриншот скоро появится</span>
                        </div>
                      )}
                    </div>
                    <div className="px-6 py-5">
                      <h3 className="text-lg font-bold tracking-tight text-navy">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Partner mobile screenshots */}
        <h3 className="mb-8 mt-20 text-center text-2xl font-bold tracking-tight text-navy md:text-3xl">
          Приложение для партнера
        </h3>
        <div className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-3">
          {partnerMobileScreenshots.map((item) => {
            const url = settings[item.key];
            return (
              <IPhoneFrame key={item.key} label={item.label} onClick={url ? () => openLightbox(url, item.label) : undefined}>
                {url ? (
                  <img
                    src={url}
                    alt={item.label}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-300">
                    <Smartphone className="h-12 w-12" />
                    <span className="text-sm">Скриншот скоро появится</span>
                  </div>
                )}
              </IPhoneFrame>
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
    </section>
  );
};

export default PlatformShowcase;
