import { FileText, Layers, MessageSquare, Smartphone } from "lucide-react";
import { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / (fontSize * 1.8));
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.random() * -50
    );

    const chars = "00 01 10 11".split(" ");

    const draw = () => {
      ctx.fillStyle = "rgba(245, 247, 250, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize * 1.8;
        const y = drops[i] * fontSize;

        const opacity = 0.06 + Math.random() * 0.06;
        ctx.fillStyle = `rgba(42, 109, 255, ${opacity})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.3;
      }
    };

    const interval = setInterval(draw, 80);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
};

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
      "ИИ под капотом анализирует ход дела, контролирует бизнес-процессы и подсказывает следующие шаги. Напоминания о сроках публикаций в ЕФРСБ и заседаниях, о ключевых задачах и рисках.",
  },
  {
    icon: Smartphone,
    title: "Приложение для партнера и должника",
    description:
      "Должник видит статус дела, получает уведомления о заседаниях и сроках, загружает документы и общается с управляющим через чат — всё в одном приложении без звонков и визитов.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-off-white py-24">
      {/* Matrix falling background */}
      <MatrixBackground />

      <div className="container relative z-[2]">
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-navy md:text-[2.5rem]">
            Инструменты для эффективности
          </h2>
          <p className="text-lg text-slate">
            Мы убрали рутину, чтобы вы могли вести больше дел одновременно.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
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
