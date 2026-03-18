import { useState, useEffect } from "react";
import { getSettings, SiteSetting } from "@/lib/api";
import LeadFormDialog from "@/components/LeadFormDialog";

const ChainLinkDeco = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="relative h-[140px] w-[80px] rounded-[40px] border-[12px] border-white/10 animate-float"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="absolute left-[30px] top-[30px] h-[140px] w-[80px] rounded-[40px] border-[12px] border-white/10" />
  </div>
);

const HeroSection = () => {
  const [heroVideo, setHeroVideo] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    getSettings()
      .then((data: SiteSetting[]) => {
        const video = data.find((s) => s.setting_key === "hero_video");
        if (video?.setting_value) setHeroVideo(video.setting_value);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-32">
      {/* Blue decorative background / Video */}
      <div className={`absolute -right-[10%] -top-[20%] z-0 h-[140%] w-[60%] -skew-x-[10deg] overflow-hidden ${videoReady ? "bg-transparent" : "bg-blue-vivid"}`}>
        {heroVideo && (
          <video
            src={heroVideo}
            className={`h-full w-full skew-x-[10deg] scale-110 object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            autoPlay
            loop
            muted
            playsInline
            onCanPlayThrough={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
          />
        )}
        {!videoReady && (
          <div className="absolute inset-0 flex h-full w-full flex-wrap items-center justify-center gap-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <ChainLinkDeco key={i} delay={i * 0.4} />
            ))}
          </div>
        )}
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

        <div className="relative z-[2] max-w-[600px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
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
            <a
              href="https://sau.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-vivid px-8 py-4 text-base font-semibold text-white shadow-btn-primary transition-all hover:-translate-y-0.5 hover:bg-blue-sky hover:shadow-btn-primary-hover"
            >
              Войти в платформу
            </a>
            <LeadFormDialog
              triggerLabel="Оставить заявку на подключение"
              triggerClassName="inline-flex items-center justify-center rounded-lg border-2 border-navy px-8 py-4 text-base font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
