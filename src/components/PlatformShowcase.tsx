import { useState, useEffect } from "react";
import { getSettings, SiteSetting } from "@/lib/api";
import { Monitor, Smartphone } from "lucide-react";

const screenshots = [
  { key: "screenshot_partner_cabinet", label: "Личный кабинет партнера" },
  { key: "screenshot_case_card", label: "Карточка дела" },
  { key: "screenshot_chat", label: "Экран внутреннего чата" },
  { key: "screenshot_case_submission", label: "Подача дела" },
  { key: "screenshot_mobile_app", label: "Экран мобильного приложения", mobile: true },
];

const PlatformShowcase = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

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

        <div className="grid gap-8 lg:grid-cols-2">
          {screenshots.filter((s) => !s.mobile).map((item) => {
            const url = settings[item.key];
            return (
              <div
                key={item.key}
                className="group overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-float"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                  {url ? (
                    <img
                      src={url}
                      alt={item.label}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
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

        {/* Mobile screenshot — full width, centered */}
        {screenshots.filter((s) => s.mobile).map((item) => {
          const url = settings[item.key];
          return (
            <div key={item.key} className="mx-auto mt-8 max-w-[400px]">
              <div className="group overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-float">
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-50">
                  {url ? (
                    <img
                      src={url}
                      alt={item.label}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-300">
                      <Smartphone className="h-12 w-12" />
                      <span className="text-sm">Скриншот скоро появится</span>
                    </div>
                  )}
                </div>
                <div className="px-6 py-5">
                  <h3 className="text-center text-lg font-bold tracking-tight text-navy">
                    {item.label}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlatformShowcase;
